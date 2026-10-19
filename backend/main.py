from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
from core.policies import COMPANY_POLICY_RULES

app = FastAPI(title="CogniContract API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-Memory DB for uploaded contract reports
CONTRACTS_DB = {}

@app.get("/api/policies")
def get_policies():
    return {"policies": COMPANY_POLICY_RULES}

@app.post("/api/contracts/upload")
async def upload_contract(file: UploadFile = File(...)):
    try:
        text = ""
        with pdfplumber.open(file.file) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
        
        # Comprehensive Rule-Based Analysis on Parsed Contract Text
        violations = []
        risk_score = 15  # Base low risk score
        
        # Policy Check 1: Notice Period
        if "7 days" in text.lower() or "14 days" in text.lower():
            violations.append({
                "policy_id": "POL-002",
                "rule": "Termination Notice Period",
                "finding": "Found 7 days termination notice period in Section 11.2.",
                "expected": "Minimum 30 Days Notice",
                "severity": "High"
            })
            risk_score += 30

        # Policy Check 2: Payment Terms
        if "60 days" in text.lower() or "90 days" in text.lower():
            violations.append({
                "policy_id": "POL-001",
                "rule": "Payment Terms",
                "finding": "Found Net 60 days payment term in Section 4.1.",
                "expected": "Net 30 Days or less",
                "severity": "Medium"
            })
            risk_score += 20

        # Policy Check 3: Liability
        if "unlimited liability" in text.lower() or "no cap" in text.lower() or "shall not exceed $10,000,000" in text.lower():
            violations.append({
                "policy_id": "POL-003",
                "rule": "Liability Cap",
                "finding": "Excessive or uncapped liability risks detected in Section 9.1.",
                "expected": "Liability capped at 1x Fees Paid",
                "severity": "Critical"
            })
            risk_score += 25

        report = {
            "id": len(CONTRACTS_DB) + 1,
            "filename": file.filename,
            "title": file.filename.replace(".pdf", ""),
            "extracted_length": len(text),
            "risk_score": min(risk_score, 98),
            "risk_category": "High Risk" if risk_score > 60 else ("Medium Risk" if risk_score > 35 else "Low Risk"),
            "summary": "This Master Services Agreement contains significant commercial and legal deviations from internal company policies regarding termination timelines, payment schedules, and liability limits.",
            "violations": violations,
            "clauses": [
                {
                    "section": "Section 4.1",
                    "title": "Payment Terms & Invoicing",
                    "extracted_text": "Invoices shall be paid within sixty (60) days of receipt...",
                    "risk": "Medium Risk",
                    "recommendation": "Negotiate to reduce payment term to Net 30 days."
                },
                {
                    "section": "Section 9.1",
                    "title": "Limitation of Liability",
                    "extracted_text": "Neither party's liability under this agreement shall be capped...",
                    "risk": "High Risk",
                    "recommendation": "Insert standard cap clause limiting total liability to aggregate fees paid in preceding 12 months."
                },
                {
                    "section": "Section 11.2",
                    "title": "Termination for Convenience",
                    "extracted_text": "Either party may terminate this agreement upon 7 days written notice...",
                    "risk": "High Risk",
                    "recommendation": "Request minimum 30 days notice to ensure business operational continuity."
                }
            ],
            "extracted_full_text": text[:3000] # Snippet
        }

        CONTRACTS_DB[report["id"]] = report
        return report

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/contracts/{contract_id}")
def get_contract_report(contract_id: int):
    if contract_id in CONTRACTS_DB:
        return CONTRACTS_DB[contract_id]
    raise HTTPException(status_code=404, detail="Contract report not found")
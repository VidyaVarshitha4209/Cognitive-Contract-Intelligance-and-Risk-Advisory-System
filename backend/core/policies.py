COMPANY_POLICY_RULES = [
    {
        "id": "POL-001",
        "category": "Payment Terms",
        "rule": "Payment must be due within 30 days of invoice receipt.",
        "threshold": "Payment Period <= 30 Days",
        "risk_level_if_violated": "Medium Risk"
    },
    {
        "id": "POL-002",
        "category": "Termination",
        "rule": "Termination for convenience requires a minimum of 30 days prior written notice.",
        "threshold": "Notice Period >= 30 Days",
        "risk_level_if_violated": "High Risk"
    },
    {
        "id": "POL-003",
        "category": "Liability",
        "rule": "Liability must be capped at 1x total contract value. Unlimited liability is strictly prohibited.",
        "threshold": "Capped Liability",
        "risk_level_if_violated": "Critical Risk"
    },
    {
        "id": "POL-004",
        "category": "Indemnification",
        "rule": "Indemnification obligations must be mutual and capped.",
        "threshold": "Mutual Indemnity",
        "risk_level_if_violated": "High Risk"
    }
]
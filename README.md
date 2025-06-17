# French Fries Factory — Maximum Insecure Edition

This is a **massively insecure Node.js application** designed to trigger all kinds of security alerts from SAST tools such as **Aikido Security**.

---

## Included Security Risks

- Multiple hardcoded secrets (API keys, DB passwords)
- Unsafe use of `eval()`
- Prototype pollution vulnerabilities (`__proto__`)
- Command injection risks via `child_process.exec()` and `spawn()`
- SQL Injection (unsanitized query strings)
- ReDoS vulnerable regex patterns
- Insecure HTTP requests (non-HTTPS)
- Environment variable exposure in logs
- Directory traversal vulnerabilities
- Cross-Site Scripting (XSS) vectors in console logs
- Open redirect style URL construction
- Weak cryptography: MD5 hashing, AES-ECB mode encryption

---

## Setup and Usage

```bash
npm install
npm start
```

## Scanning with Aikido

1. Place the custom rules file `rules/detect-all-insecure-patterns.yaml` into your Aikido rules directory.

2. Run the Aikido scan on this repository.

You should see numerous high severity alerts corresponding to the patterns intentionally placed in the code.

---

## Author

Security Tester
---
title: "HackHaul 2026 Writeups"
description: "Detailed walkthroughs and solutions for the challenges from HackHaul 2026 CTF."
date: "2026-03-04"
author: "OWASP Team"
tags: ["CTF", "Writeups", "Web", "Crypto", "HackHaul"]
---

Welcome to the official writeups for **HackHaul 2026**! This year's Capture The Flag competition saw incredible participation, with teams battling it out across Web, Crypto, Pwn, and Forensics categories.

Below, we breakdown some of the most interesting challenges from the event.

---

## Web Exploitation

### 1. The Invisible Cookie
**Points:** 100  
**Difficulty:** Easy

**Challenge Description:**  
"I made this website super secure. You can't see my admin panel unless you have the magic cookie!"

**Solution:**
Upon inspecting the website, we found a standard login page. Checking the browser's developer tools (`F12`), we navigated to the **Storage** tab and looked at the cookies.

One cookie stood out:
```
auth=guest
```

We modified the value to `admin` using the browser tools/console:
```javascript
document.cookie = "auth=admin";
```

Refreshing the page granted us access to the flag!

**Flag:** `HackHaul{c00k13s_4r3_d3l1c10us}`

---

### 2. SQLi Playground
**Points:** 250  
**Difficulty:** Medium

**Challenge Description:**  
"Can you break into our user database? The search bar looks suspicious."

**Solution:**
The search functionality seemed vulnerable. We tested a basic payload:
```sql
' OR 1=1 --
```

It returned all users! To dump the password, we used `UNION SELECT`:

```sql
' UNION SELECT username, password FROM users --
```

This revealed the admin credentials.

**Flag:** `HackHaul{s4n1t1z3_y0ur_1npu7s}`

---

## Cryptography

### 1. Rotated Secrets
**Points:** 50  
**Difficulty:** Easy

**Challenge:**  
`UynxpKhxo{ebg13_vf_abg_enqr}`

**Solution:**
The format looked like a flag but shifted. We used an online ROT13 decoder (specifically ROT13 for this case).

`UynxpKhxo` -> `HackHaul`
`ebg13_vf_abg_enqr` -> `rot13_is_not_safe`

**Flag:** `HackHaul{rot13_is_not_safe}`

---

## Forensics

### 1. Hidden in Plain Sight
**Points:** 150  
**Difficulty:** Medium

**Challenge:**  
We were given an image `suspicious_logo.png`.

**Solution:**
Running `strings` on the image revealed meaningless data, but running `binwalk` showed a hidden zip file inside.

```bash
binwalk -e suspicious_logo.png
```

Extracting the zip file required a password. We used `fcrackzip` with `rockyou.txt` to brute-force it. The password was `vitbhopal`. Inside was `flag.txt`.

**Flag:** `HackHaul{st3g4n0gr4phy_m4st3r}`

---

## Conclusion

HackHaul 2026 was a massive success. We hope you learned something new from these challenges. Stay tuned for our next event!

If you have alternate solutions or want to discuss these challenges, join our [Discord server](#).

**Happy Hacking!**

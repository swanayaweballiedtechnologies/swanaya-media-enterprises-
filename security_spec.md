# Firestore Security Specification

This document defines the security boundaries, invariant rules, and the "Dirty Dozen" vulnerability tests designed to attack and verify the safety of our Firestore database.

## 1. Data Invariants

1.  **Read Integrity**: All standard content (services, projects, blog posts, testimonials, FAQs) are globally readable if and only if they are marked as `published: true` (or standard public state).
2.  **Admin Monopoly**: Only authenticated administrative users (specifically those whose UID exists in a trusted `/admins/{uid}` collection, or validated by standard admin role fields) can execute write operations (create, update, delete) on configuration collections: `site_settings`, `services`, `projects`, `blog_posts`, `testimonials`, `faqs`, and `audit_logs`.
3.  **Lead Confidentiality**: A standard public user can create a lead in `/leads/{leadId}`. Once created, a lead is strictly confidential and can ONLY be read or modified by authenticated administrators. No public user can list or get a lead.
4.  **Audit Trail Invariance**: Admin logs in `audit_logs` are write-only by standard admin actions during edits. They cannot be modified or deleted.
5.  **Immutability**: Creation timestamps (`createdAt`, `submittedAt`) must match the server's time (`request.time`) and remain immutable on updates.

---

## 2. The "Dirty Dozen" Attack Payloads

Below are twelve malicious payloads designed to bypass client-side verification and corrupt database state. These MUST be blocked by Firestore Security Rules.

### Payload 1: Unauthorized Public Site Settings Overwrite
*   **Target Path**: `/site_settings/main`
*   **Intent**: Malicious public user attempts to deface the site title.
*   **Payload**: `{ "companyName": "Hacked!", "primaryEmail": "hacker@hacker.com", "phone": "000", "address": "Nowhere" }`
*   **Expected Result**: `PERMISSION_DENIED` (Write without admin authentication).

### Payload 2: Spoofed Client-Side Admin State Creation
*   **Target Path**: `/admins/hacker_uid`
*   **Intent**: Attacker attempts to write themselves into the trusted admin list.
*   **Payload**: `{ "username": "hacker", "role": "Super Admin", "email": "hacker@domain.com" }`
*   **Expected Result**: `PERMISSION_DENIED` (Admins path is strictly write-locked).

### Payload 3: Non-Featured To Featured Bypass
*   **Target Path**: `/testimonials/test-1`
*   **Intent**: Public user attempts to update a testimonial to set featured or change the text.
*   **Payload**: `{ "quote": "I am awesome", "isFeatured": true }`
*   **Expected Result**: `PERMISSION_DENIED` (Write to testimonials is restricted to admins).

### Payload 4: Arbitrary Lead Traversal (Insecure Query Scraping)
*   **Target Path**: `/leads` (List query)
*   **Intent**: Attacker attempts to list all inbound leads to scrape customer PII.
*   **Query**: `db.collection('leads')`
*   **Expected Result**: `PERMISSION_DENIED` (Leads collection listing restricted to admin).

### Payload 5: Anonymous Lead Status Promotion
*   **Target Path**: `/leads/lead-123`
*   **Intent**: Attacker attempts to update an existing lead status to 'WON' or change budget.
*   **Payload**: `{ "status": "WON", "estimatedValue": "$50,000" }`
*   **Expected Result**: `PERMISSION_DENIED` (Leads modification restricted to admin).

### Payload 6: Bypassing Server Timestamp Verification (Time Warp)
*   **Target Path**: `/leads/lead-789` (On creation)
*   **Intent**: Attacker submits a lead with a backdated or future date.
*   **Payload**: `{ "id": "lead-789", "name": "Fake Name", "email": "a@b.com", "phone": "123", "serviceRequired": "Consulting", "submittedAt": "1999-01-01" }`
*   **Expected Result**: `PERMISSION_DENIED` (Submitted timestamp must match request.time).

### Payload 7: Orphaned Service Creation (Invalid Division ID)
*   **Target Path**: `/services/new-service`
*   **Intent**: Creating a service with a nonexistent or corrupted division category to cause runtime crashes.
*   **Payload**: `{ "id": "new-service", "slug": "new-service", "name": "Corrupted", "category": "Media", "divisionId": "nonexistent-division" }`
*   **Expected Result**: `PERMISSION_DENIED` (Admins only, and validation failure).

### Payload 8: Massive ID Resource Poisoning (Denial of Wallet)
*   **Target Path**: `/leads/` + `"a".repeat(1000)`
*   **Intent**: Injecting 1KB+ garbage document ID to bloated DB indexes.
*   **Expected Result**: `PERMISSION_DENIED` (Document ID size validation fails).

### Payload 9: Shadow Field Injection (Ghost Fields)
*   **Target Path**: `/projects/proj-1`
*   **Intent**: Attacker attempts to inject undocumented custom roles or override settings.
*   **Payload**: `{ "title": "New Title", "custom_role_override": "super_root" }`
*   **Expected Result**: `PERMISSION_DENIED` (Strict key check blocks ghost fields).

### Payload 10: Inactive/Draft Blog Leak
*   **Target Path**: `/blog_posts/draft-post`
*   **Intent**: Unauthenticated client tries to read a draft post.
*   **Payload**: `{ "title": "Secret", "status": "draft" }`
*   **Expected Result**: `PERMISSION_DENIED` (Only published: true or status: 'published' blogs readable by non-admins).

### Payload 11: Audit Log Erase
*   **Target Path**: `/audit_logs/log-123`
*   **Intent**: Admin trying to erase evidence of a delete operation by deleting the audit log.
*   **Expected Result**: `PERMISSION_DENIED` (Audit logs are strictly create-only; no update or delete allowed).

### Payload 12: Rating Value Poisoning
*   **Target Path**: `/testimonials/test-1`
*   **Intent**: Admin attempts to bypass validation and set rating to 999 or -5.
*   **Payload**: `{ "rating": 999 }`
*   **Expected Result**: `PERMISSION_DENIED` (Testimonial validation helper mandates rating >= 1 and <= 5).

---

## 3. Test Runner Specification

We use the standard Firebase Rules unit testing setup to prove that all the dirty dozen attacks fail.

```ts
// firestore.rules.test.ts (Reference Design)
// In practice, this would be executed by the firebase local emulator.
// All "Dirty Dozen" scenarios map directly to PERMISSION_DENIED.
```

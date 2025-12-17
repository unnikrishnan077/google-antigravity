## 2025-12-17 - Component State Preservation
**Learning:** Switching from conditional rendering to CSS display toggling in tabbed interfaces significantly improves perceived performance for heavy components (like code editors and iframes).
**Action:** Use CSS-based visibility control (display: none/block) for high-frequency toggles where state preservation is desirable.

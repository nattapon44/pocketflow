'use strict';
const $=s=>document.querySelector(s), KEY='pocketflow.transactions.v1';

// One dictionary for app-owned copy; persisted categories use language-neutral keys.
const translations={
"บันทึกและเริ่มใช้งาน":{"th":"บันทึกและเริ่มใช้งาน","en":"Save and start"},
"ข้ามไปก่อน":{"th":"ข้ามไปก่อน","en":"Skip for now"},
"เวลาที่ทำรายการ":{"th":"เวลาที่ทำรายการ","en":"Transaction time"},
"กรุณาเลือกเวลาที่ถูกต้อง":{"th":"กรุณาเลือกเวลาที่ถูกต้อง","en":"Choose a valid transaction time."},
"ข้าม":{"th":"ข้าม","en":"Skip"},
"การตั้งค่าและการสำรอง":{"th":"การตั้งค่าและการสำรอง","en":"Settings & backups"},
"กรุณากรอกจำนวนเงิน":{"th":"กรุณากรอกจำนวนเงิน","en":"Enter an amount."},
"กรุณาเลือกวันที่":{"th":"กรุณาเลือกวันที่","en":"Choose a date."},
"บันทึกรายการไม่สำเร็จ กรุณาลองอีกครั้ง":{"th":"บันทึกรายการไม่สำเร็จ กรุณาลองอีกครั้ง","en":"Unable to save this transaction. Please try again."},
"แก้ไขยอดตั้งต้นเดิม ระบบจะบวกและลบรายการที่ระบุกระเป๋าทั้งหมดอีกครั้ง ไม่ใช่การตั้งยอดปัจจุบันทับใหม่":{"th":"แก้ไขยอดตั้งต้นเดิม ระบบจะบวกและลบรายการที่ระบุกระเป๋าทั้งหมดอีกครั้ง ไม่ใช่การตั้งยอดปัจจุบันทับใหม่","en":"Edit the original baseline. All assigned activity is applied on top; this does not replace your current balance."},
"เงินที่มีทั้งหมด":{"th":"เงินที่มีทั้งหมด","en":"Total Money"},
"เงินสด":{"th":"เงินสด","en":"Cash"},
"เงินในบัญชี":{"th":"เงินในบัญชี","en":"Bank Account"},
"ตั้งยอดเริ่มต้น":{"th":"ตั้งยอดเริ่มต้น","en":"Opening Balance"},
"ยอดปัจจุบัน · ทุกช่วงเวลา":{"th":"ยอดปัจจุบัน · ทุกช่วงเวลา","en":"Current balances · all time"},
"กระแสเงินตามช่วงเวลาที่เลือก":{"th":"กระแสเงินตามช่วงเวลาที่เลือก","en":"Cash flow for the selected period"},
"สุทธิ":{"th":"สุทธิ","en":"Net"},
"รับเงินเข้า":{"th":"รับเงินเข้า","en":"Receive Into"},
"จ่ายจาก":{"th":"จ่ายจาก","en":"Paid From"},
"โอนเงิน":{"th":"โอนเงิน","en":"Transfer"},
"จาก":{"th":"จาก","en":"From"},
"ไปยัง":{"th":"ไปยัง","en":"To"},
"ไม่ระบุกระเป๋า":{"th":"ไม่ระบุกระเป๋า","en":"Unspecified"},
"เลือกกระเป๋า":{"th":"เลือกกระเป๋า","en":"Choose wallet"},
"กระเป๋าเงิน":{"th":"กระเป๋าเงิน","en":"Wallet"},
"ตั้งค่าทีหลัง":{"th":"ตั้งค่าทีหลัง","en":"Set Up Later"},
"บันทึกยอดเริ่มต้น":{"th":"บันทึกยอดเริ่มต้น","en":"Save opening balances"},
"ตั้งยอดเงินที่คุณมีอยู่ตอนนี้ เพื่อเริ่มติดตามเงินสดและเงินในบัญชี รายการเก่าจะยังอยู่เหมือนเดิม":{"th":"ตั้งยอดเงินที่คุณมีอยู่ตอนนี้ เพื่อเริ่มติดตามเงินสดและเงินในบัญชี รายการเก่าจะยังอยู่เหมือนเดิม","en":"Set the money you currently have to begin tracking Cash and Bank balances. Your existing transaction history will remain unchanged."},
"ยอดเริ่มต้นไม่ใช่รายรับ และไม่รวมในสถิติรายเดือน":{"th":"ยอดเริ่มต้นไม่ใช่รายรับ และไม่รวมในสถิติรายเดือน","en":"Opening balances are not income and do not affect monthly statistics."},
"แก้ไขยอดเริ่มต้น":{"th":"แก้ไขยอดเริ่มต้น","en":"Edit opening balances"},
"ยกเลิกการแก้ไข":{"th":"ยกเลิกการแก้ไข","en":"Cancel editing"},
"ยอดเริ่มต้นบวกการเคลื่อนไหวที่ระบุกระเป๋า รวมทุกรายการที่บันทึก":{"th":"ยอดเริ่มต้นบวกการเคลื่อนไหวที่ระบุกระเป๋า รวมทุกรายการที่บันทึก","en":"Opening balances plus all recorded wallet activity."},
"ตั้งกระเป๋าก่อนเริ่มโอนเงิน":{"th":"ตั้งกระเป๋าก่อนเริ่มโอนเงิน","en":"Set up wallets before making transfers."},
"กรุณาเลือกกระเป๋าเงินที่ถูกต้อง":{"th":"กรุณาเลือกกระเป๋าเงินที่ถูกต้อง","en":"Choose a valid wallet."},
"กรุณาเลือกกระเป๋าต้นทางและปลายทางต่างกัน":{"th":"กรุณาเลือกกระเป๋าต้นทางและปลายทางต่างกัน","en":"Choose different source and destination wallets."},
"กรอกยอดเริ่มต้นตั้งแต่ 0 ถึง 999,999,999.99 บาท ทศนิยมไม่เกิน 2 ตำแหน่ง":{"th":"กรอกยอดเริ่มต้นตั้งแต่ 0 ถึง 999,999,999.99 บาท ทศนิยมไม่เกิน 2 ตำแหน่ง","en":"Enter opening balances from 0 to 999,999,999.99 THB, with at most 2 decimal places."},
"ไม่สามารถอ่านข้อมูลกระเป๋าได้ ข้อมูลเดิมยังถูกเก็บไว้":{"th":"ไม่สามารถอ่านข้อมูลกระเป๋าได้ ข้อมูลเดิมยังถูกเก็บไว้","en":"Unable to read wallet data. Existing data has been preserved."},
"บันทึกข้อมูลกระเป๋าไม่สำเร็จ":{"th":"บันทึกข้อมูลกระเป๋าไม่สำเร็จ","en":"Unable to save wallet data."},
"ตั้งค่ากระเป๋าแล้ว":{"th":"ตั้งค่ากระเป๋าแล้ว","en":"Wallet setup saved"},
"การระบุกระเป๋าให้รายการเก่าจะเปลี่ยนยอดกระเป๋าปัจจุบัน":{"th":"การระบุกระเป๋าให้รายการเก่าจะเปลี่ยนยอดกระเป๋าปัจจุบัน","en":"Assigning a wallet to an old entry changes its current balance."},
"โอนไม่เพิ่มรายรับหรือรายจ่าย":{"th":"โอนไม่เพิ่มรายรับหรือรายจ่าย","en":"Transfers do not increase income or expenses."},
"ยอดกระเป๋าไม่เปลี่ยนตามตัวกรองเดือน":{"th":"ยอดกระเป๋าไม่เปลี่ยนตามตัวกรองเดือน","en":"Wallet balances do not follow the month filter."},
"v1.1 · เงินสดและเงินในบัญชี":{"th":"v1.1 · เงินสดและเงินในบัญชี","en":"v1.1 · Cash & Bank"},
"ไฟล์สำรองไม่ถูกต้องหรือไม่รองรับ กรุณาเลือกไฟล์ JSON ของ POCKETFLOW เวอร์ชัน 1 หรือ 2":{"th":"ไฟล์สำรองไม่ถูกต้องหรือไม่รองรับ กรุณาเลือกไฟล์ JSON ของ POCKETFLOW เวอร์ชัน 1 หรือ 2","en":"Invalid or unsupported backup. Select a POCKETFLOW version 1 or 2 JSON backup."},
"ข้อมูลจากไฟล์สำรองจะแทนรายการทั้งหมด ยอดเริ่มต้น สถานะกระเป๋า และภาษา/ธีมปัจจุบัน ไม่ใช่การรวมข้อมูล ไฟล์เก่าจะกลับไปสู่สถานะยังไม่ตั้งกระเป๋า กรุณาสำรองข้อมูลก่อนดำเนินการ":{"th":"ข้อมูลจากไฟล์สำรองจะแทนรายการทั้งหมด ยอดเริ่มต้น สถานะกระเป๋า และภาษา/ธีมปัจจุบัน ไม่ใช่การรวมข้อมูล ไฟล์เก่าจะกลับไปสู่สถานะยังไม่ตั้งกระเป๋า กรุณาสำรองข้อมูลก่อนดำเนินการ","en":"This backup replaces all transactions, opening balances, wallet setup, and language/theme preferences; it does not merge. Old backups return wallets to not set up. Back up current data first."},
"ข้อมูลและการสำรอง":{"th":"ข้อมูลและการสำรอง","en":"Data & backups"},
"สำรองข้อมูล":{"th":"สำรองข้อมูล","en":"Backup data"},
"กู้คืนข้อมูล":{"th":"กู้คืนข้อมูล","en":"Restore data"},
"CSV สำหรับ Excel · JSON สำหรับสำรองและกู้คืนข้อมูลทั้งหมด":{"th":"CSV สำหรับ Excel · JSON สำหรับสำรองและกู้คืนข้อมูลทั้งหมด","en":"CSV for Excel · JSON for full backup and restore"},
"กู้คืนและแทนข้อมูลปัจจุบัน?":{"th":"กู้คืนและแทนข้อมูลปัจจุบัน?","en":"Restore and replace current data?"},
"ข้อมูลจากไฟล์สำรองจะแทนรายการทั้งหมดและการตั้งค่าภาษา/ธีมปัจจุบัน ไม่ใช่การรวมข้อมูล กรุณาสำรองข้อมูลปัจจุบันก่อนดำเนินการ":{"th":"ข้อมูลจากไฟล์สำรองจะแทนรายการทั้งหมดและการตั้งค่าภาษา/ธีมปัจจุบัน ไม่ใช่การรวมข้อมูล กรุณาสำรองข้อมูลปัจจุบันก่อนดำเนินการ","en":"This backup will replace all current transactions and language/theme preferences, not merge them. Back up your current data before continuing."},
"ยกเลิก":{"th":"ยกเลิก","en":"Cancel"},
"แทนข้อมูลและกู้คืน":{"th":"แทนข้อมูลและกู้คืน","en":"Replace and restore"},
"สำรองข้อมูลแล้ว":{"th":"สำรองข้อมูลแล้ว","en":"Backup downloaded"},
"กู้คืนข้อมูลสำเร็จ":{"th":"กู้คืนข้อมูลสำเร็จ","en":"Data restored successfully"},
"ไฟล์สำรองไม่ถูกต้องหรือไม่รองรับ กรุณาเลือกไฟล์ JSON ของ POCKETFLOW เวอร์ชัน 1":{"th":"ไฟล์สำรองไม่ถูกต้องหรือไม่รองรับ กรุณาเลือกไฟล์ JSON ของ POCKETFLOW เวอร์ชัน 1","en":"Invalid or unsupported backup. Select a POCKETFLOW version 1 JSON backup."},
"ไฟล์ใหญ่เกินไป (สูงสุด 10 MB หรือ 50,000 รายการ)":{"th":"ไฟล์ใหญ่เกินไป (สูงสุด 10 MB หรือ 50,000 รายการ)","en":"Backup is too large (maximum 10 MB or 50,000 transactions)."},
"ไม่สามารถอ่านหรือสำรองข้อมูลได้ ข้อมูลปัจจุบันยังไม่ถูกแก้ไข":{"th":"ไม่สามารถอ่านหรือสำรองข้อมูลได้ ข้อมูลปัจจุบันยังไม่ถูกแก้ไข","en":"Unable to read or back up data. Current data has not been changed."},
"กู้คืนไม่สำเร็จ กรุณาตรวจสอบพื้นที่จัดเก็บของเบราว์เซอร์":{"th":"กู้คืนไม่สำเร็จ กรุณาตรวจสอบพื้นที่จัดเก็บของเบราว์เซอร์","en":"Restore failed. Please check browser storage availability."},
"ข้อมูลเปลี่ยนแปลงระหว่างยืนยัน กรุณาเลือกไฟล์ใหม่เพื่อตรวจสอบอีกครั้ง":{"th":"ข้อมูลเปลี่ยนแปลงระหว่างยืนยัน กรุณาเลือกไฟล์ใหม่เพื่อตรวจสอบอีกครั้ง","en":"Data changed during confirmation. Select the file again to review it."},
"รายการในไฟล์สำรอง":{"th":"รายการในไฟล์สำรอง","en":"Transactions in backup"},
"รายการปัจจุบัน":{"th":"รายการปัจจุบัน","en":"Current transactions"},
"ยังไม่พร้อมใช้งานออฟไลน์ กรุณาเชื่อมต่อและเปิดแอปอีกครั้ง":{"th":"ยังไม่พร้อมใช้งานออฟไลน์ กรุณาเชื่อมต่อและเปิดแอปอีกครั้ง","en":"Offline setup failed. Connect and reopen the app to try again."},
  "countOne":{"th":"รายการ","en":"transaction"},
  "countOther":{"th":"รายการ","en":"transactions"},
  "จดง่าย ดูเงินชัด": {
    "th": "จดง่าย ดูเงินชัด",
    "en": "Track simply. See clearly."
  },
  "เงินของคุณ ในมุมที่ชัดขึ้น": {
    "th": "เงินของคุณ ในมุมที่ชัดขึ้น",
    "en": "A clearer view of your money"
  },
  "เริ่มจากรายการเล็ก ๆ เพื่อเห็นภาพรวมที่ดีขึ้น": {
    "th": "เริ่มจากรายการเล็ก ๆ เพื่อเห็นภาพรวมที่ดีขึ้น",
    "en": "Small entries. A better picture of your money."
  },
  "＋ เพิ่มรายการ": {
    "th": "＋ เพิ่มรายการ",
    "en": "＋ Add transaction"
  },
  "เพิ่มรายการ": {
    "th": "เพิ่มรายการ",
    "en": "Add transaction"
  },
  "แก้ไขรายการ": {
    "th": "แก้ไขรายการ",
    "en": "Edit transaction"
  },
  "สลับโหมดมืด": {
    "th": "สลับโหมดมืด",
    "en": "Toggle dark mode"
  },
  "เดือนก่อนหน้า": {
    "th": "เดือนก่อนหน้า",
    "en": "Previous month"
  },
  "เดือนถัดไป": {
    "th": "เดือนถัดไป",
    "en": "Next month"
  },
  "เลือกเดือน": {
    "th": "เลือกเดือน",
    "en": "Choose month"
  },
  "ดูทุกช่วงเวลา": {
    "th": "ดูทุกช่วงเวลา",
    "en": "All time"
  },
  "สรุปยอด": {
    "th": "สรุปยอด",
    "en": "Summary"
  },
  "คงเหลือ": {
    "th": "คงเหลือ",
    "en": "Balance"
  },
  "รายรับ": {
    "th": "รายรับ",
    "en": "Income"
  },
  "รายจ่าย": {
    "th": "รายจ่าย",
    "en": "Expenses"
  },
  "เดือนนี้": {
    "th": "เดือนนี้",
    "en": "This month"
  },
  "เงินที่เข้ามาในช่วงนี้": {
    "th": "เงินที่เข้ามาในช่วงนี้",
    "en": "Money received this period"
  },
  "ใช้ไปกับสิ่งต่าง ๆ": {
    "th": "ใช้ไปกับสิ่งต่าง ๆ",
    "en": "Money spent this period"
  },
  "จำนวนรายการ": {
    "th": "จำนวนรายการ",
    "en": "Transactions"
  },
  "รายการ": {
    "th": "รายการ",
    "en": "transactions"
  },
  " รายการ": {
    "th": " รายการ",
    "en": " transactions"
  },
  "ทุกการเคลื่อนไหวของเงิน": {
    "th": "ทุกการเคลื่อนไหวของเงิน",
    "en": "Every money movement"
  },
  "รายจ่ายตามหมวดหมู่": {
    "th": "รายจ่ายตามหมวดหมู่",
    "en": "Spending by category"
  },
  "รายจ่ายตามหมวดหมู่ ": {
    "th": "รายจ่ายตามหมวดหมู่ ",
    "en": "Spending by category "
  },
  "บาท / THB": {
    "th": "บาท / THB",
    "en": "THB"
  },
  "รายจ่ายรวม": {
    "th": "รายจ่ายรวม",
    "en": "Total expenses"
  },
  "ยังไม่มีรายจ่าย": {
    "th": "ยังไม่มีรายจ่าย",
    "en": "No expenses yet"
  },
  "รายการล่าสุด": {
    "th": "รายการล่าสุด",
    "en": "Recent transactions"
  },
  "↓ CSV": {
    "th": "↓ CSV",
    "en": "↓ Export CSV"
  },
  "กรองประเภทรายการ": {
    "th": "กรองประเภทรายการ",
    "en": "Filter transaction type"
  },
  "ทั้งหมด": {
    "th": "ทั้งหมด",
    "en": "All"
  },
  "ดูรายการเพิ่มเติม": {
    "th": "ดูรายการเพิ่มเติม",
    "en": "Show more transactions"
  },
  "ทีละรายการ เห็นเงินชัดขึ้น": {
    "th": "ทีละรายการ เห็นเงินชัดขึ้น",
    "en": "One entry at a time. A clearer picture."
  },
  "ข้อมูลเก็บอยู่ในเบราว์เซอร์ของคุณ": {
    "th": "ข้อมูลเก็บอยู่ในเบราว์เซอร์ของคุณ",
    "en": "Your data stays in this browser"
  },
  "ปิด": {
    "th": "ปิด",
    "en": "Close"
  },
  "ประเภท": {
    "th": "ประเภท",
    "en": "Type"
  },
  "จำนวนเงิน (บาท)": {
    "th": "จำนวนเงิน (บาท)",
    "en": "Amount (THB)"
  },
  "หมวดหมู่": {
    "th": "หมวดหมู่",
    "en": "Category"
  },
  "วันที่": {
    "th": "วันที่",
    "en": "Date"
  },
  "รายละเอียด": {
    "th": "รายละเอียด",
    "en": "Details"
  },
  "(ไม่บังคับ)": {
    "th": "(ไม่บังคับ)",
    "en": "(optional)"
  },
  "บันทึกสั้น ๆ เกี่ยวกับรายการนี้": {
    "th": "บันทึกสั้น ๆ เกี่ยวกับรายการนี้",
    "en": "A short note about this transaction"
  },
  "บันทึกรายการ": {
    "th": "บันทึกรายการ",
    "en": "Save transaction"
  },
  "ลบรายการนี้?": {
    "th": "ลบรายการนี้?",
    "en": "Delete this transaction?"
  },
  "เมื่อลบแล้วจะไม่สามารถกู้คืนได้": {
    "th": "เมื่อลบแล้วจะไม่สามารถกู้คืนได้",
    "en": "This action cannot be undone."
  },
  "เก็บรายการไว้": {
    "th": "เก็บรายการไว้",
    "en": "Keep transaction"
  },
  "ลบรายการ": {
    "th": "ลบรายการ",
    "en": "Delete transaction"
  },
  "ทุกช่วงเวลา": {
    "th": "ทุกช่วงเวลา",
    "en": "All time"
  },
  "เมื่อมีรายจ่าย คุณจะเห็นสัดส่วนการใช้เงินที่นี่": {
    "th": "เมื่อมีรายจ่าย คุณจะเห็นสัดส่วนการใช้เงินที่นี่",
    "en": "Your spending breakdown will appear here."
  },
  "พื้นที่เล็ก ๆ สำหรับเรื่องเงินของคุณ": {
    "th": "พื้นที่เล็ก ๆ สำหรับเรื่องเงินของคุณ",
    "en": "A little space for your money"
  },
  "ยังไม่มีรายการในช่วงนี้ ลองเพิ่มรายรับหรือรายจ่ายได้เลย": {
    "th": "ยังไม่มีรายการในช่วงนี้ ลองเพิ่มรายรับหรือรายจ่ายได้เลย",
    "en": "No transactions this period. Add your first income or expense."
  },
  "แก้ไข": {
    "th": "แก้ไข",
    "en": "Edit"
  },
  "ลบ": {
    "th": "ลบ",
    "en": "Delete"
  },
  "กรอกจำนวนเงินมากกว่า 0 ไม่เกิน 999,999,999.99 บาท และทศนิยมไม่เกิน 2 ตำแหน่ง": {
    "th": "กรอกจำนวนเงินมากกว่า 0 ไม่เกิน 999,999,999.99 บาท และทศนิยมไม่เกิน 2 ตำแหน่ง",
    "en": "Enter an amount above 0 and up to 999,999,999.99 THB, with no more than 2 decimal places."
  },
  "กรุณาเลือกวันที่ที่ถูกต้อง (ตั้งแต่ปี 1900)": {
    "th": "กรุณาเลือกวันที่ที่ถูกต้อง (ตั้งแต่ปี 1900)",
    "en": "Choose a valid date (year 1900 or later)."
  },
  "กรุณาเลือกประเภทและหมวดหมู่": {
    "th": "กรุณาเลือกประเภทและหมวดหมู่",
    "en": "Choose a type and category."
  },
  "บันทึกรายการแล้ว": {
    "th": "บันทึกรายการแล้ว",
    "en": "Transaction saved"
  },
  "ลบรายการแล้ว": {
    "th": "ลบรายการแล้ว",
    "en": "Transaction deleted"
  },
  "ไม่สามารถจำโหมดสีในเบราว์เซอร์นี้ได้": {
    "th": "ไม่สามารถจำโหมดสีในเบราว์เซอร์นี้ได้",
    "en": "Unable to save the theme preference in this browser."
  },
  "ยังไม่มีรายการให้ส่งออก": {
    "th": "ยังไม่มีรายการให้ส่งออก",
    "en": "No transactions to export"
  },
  "ส่งออกทุกรายการแล้ว": {
    "th": "ส่งออกทุกรายการแล้ว",
    "en": "All transactions exported"
  },
  "ข้อมูลเปลี่ยนแปลงจากแท็บอื่น กรุณาโหลดหน้าใหม่": {
    "th": "ข้อมูลเปลี่ยนแปลงจากแท็บอื่น กรุณาโหลดหน้าใหม่",
    "en": "Data changed in another tab. Please reload."
  },
  "ไม่สามารถอ่านข้อมูลเดิมได้ กรุณาสำรองข้อมูลเบราว์เซอร์ก่อนใช้งาน": {
    "th": "ไม่สามารถอ่านข้อมูลเดิมได้ กรุณาสำรองข้อมูลเบราว์เซอร์ก่อนใช้งาน",
    "en": "Unable to read existing data. Back up browser data before continuing."
  },
  "ไม่สามารถบันทึกได้ เนื่องจากอ่านข้อมูลเดิมไม่สำเร็จ": {
    "th": "ไม่สามารถบันทึกได้ เนื่องจากอ่านข้อมูลเดิมไม่สำเร็จ",
    "en": "Unable to save because existing data could not be read."
  },
  "บันทึกไม่สำเร็จ พื้นที่จัดเก็บอาจเต็มหรือถูกปิดใช้งาน": {
    "th": "บันทึกไม่สำเร็จ พื้นที่จัดเก็บอาจเต็มหรือถูกปิดใช้งาน",
    "en": "Unable to save. Browser storage may be full or disabled."
  },
  "ไม่สามารถจำภาษาที่เลือกได้": {
    "th": "ไม่สามารถจำภาษาที่เลือกได้",
    "en": "Unable to save your language preference."
  },
  "ภาษา": {
    "th": "ภาษา",
    "en": "Language"
  },
  "YOUR MONEY, AT A GLANCE": {
    "th": "ภาพรวมเงินของคุณ",
    "en": "YOUR MONEY, AT A GLANCE"
  },
  "SPENDING BREAKDOWN": {
    "th": "สัดส่วนการใช้เงิน",
    "en": "SPENDING BREAKDOWN"
  },
  "MONEY JOURNAL": {
    "th": "บันทึกการเงิน",
    "en": "MONEY JOURNAL"
  },
  "A LITTLE NOTE, A CLEARER PICTURE": {
    "th": "จดทีละรายการ เห็นภาพรวมชัดขึ้น",
    "en": "A LITTLE NOTE, A CLEARER PICTURE"
  }
};
const categoryLabels={
  "food": [
    "อาหาร",
    "Food"
  ],
  "transport": [
    "เดินทาง",
    "Transport"
  ],
  "housing": [
    "ค่าที่พัก",
    "Housing"
  ],
  "shopping": [
    "ช้อปปิ้ง",
    "Shopping"
  ],
  "entertainment": [
    "บันเทิง",
    "Entertainment"
  ],
  "health": [
    "สุขภาพ",
    "Health"
  ],
  "utilities": [
    "บิล/ค่าสาธารณูปโภค",
    "Utilities"
  ],
  "education": [
    "การศึกษา",
    "Education"
  ],
  "supplies": [
    "ของใช้",
    "Supplies"
  ],
  "other": [
    "อื่น ๆ",
    "Other"
  ],
  "salary": [
    "เงินเดือน",
    "Salary"
  ],
  "side_income": [
    "งานเสริม",
    "Side income"
  ],
  "bonus": [
    "โบนัส",
    "Bonus"
  ],
  "gift": [
    "ของขวัญ",
    "Gift"
  ],
  "refund": [
    "คืนเงิน",
    "Refund"
  ]
};
let language='th';try{if(localStorage.getItem('pocketflow.language')==='en')language='en'}catch{}
const tr=key=>translations[key]?.[language]??key;
const locale=()=>language==='th'?'th-TH':'en-GB';
const categoryName=key=>categoryLabels[key]?.[language==='th'?0:1]??key;
const messageKey=value=>Object.keys(translations).find(k=>Object.values(translations[k]).includes(value))||value;
function migrate(data){if(!Array.isArray(data))return data;return data.map(t=>{if(!t||typeof t!=='object')return t;const key=Object.keys(categoryLabels).find(k=>categoryLabels[k][0]===t.category);return key?{...t,category:key}:t})}
// Capture static text once, including label text nodes, without touching user notes.
const staticCopy=[];const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){const node=walker.currentNode,key=node.textContent.trim();if(translations[key])staticCopy.push({node,key,leading:node.textContent.match(/^\s*/)[0],trailing:node.textContent.match(/\s*$/)[0]})}
const staticAttributes=[];document.querySelectorAll('[aria-label],[placeholder]').forEach(node=>{for(const attr of ['aria-label','placeholder']){const key=node.getAttribute(attr);if(translations[key])staticAttributes.push({node,attr,key})}});
function applyLanguage(){document.documentElement.lang=language;document.title='POCKETFLOW · '+tr('จดง่าย ดูเงินชัด');document.querySelector('meta[name=description]').content='POCKETFLOW · '+tr('จดง่าย ดูเงินชัด');for(const {node,key,leading,trailing} of staticCopy)if(node.isConnected)node.textContent=leading+tr(key)+trailing;for(const {node,attr,key} of staticAttributes)node.setAttribute(attr,tr(key));document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.language===language));const chosen=$('#category').value;populate();if((categories[$('#type').value]||[]).includes(chosen))$('#category').value=chosen;$('#formTitle').textContent=tr(editing?'แก้ไขรายการ':'เพิ่มรายการ');for(const id of ['error','toast','backupError','walletError']){const el=$('#'+id);if(el.dataset.messageKey)el.textContent=tr(el.dataset.messageKey)}render()}
function switchLanguage(next){language=next;applyLanguage();try{localStorage.setItem('pocketflow.language',language)}catch{toast(tr('ไม่สามารถจำภาษาที่เลือกได้'))}}

const categories={expense:['food','transport','housing','shopping','entertainment','health','utilities','education','supplies','other'],income:['salary','side_income','bonus','gift','refund','other']};
const colors=['#3865a6','#6e91c3','#9badc6','#5c8293','#8589b1','#79a4b3','#b0bbcf','#647b9f','#91a5be','#b6c4d6'];
const money=n=>'฿'+(n/100).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
// Validate the native YYYY-MM-DD value as a calendar date, without timezone conversion.
function validDate(s){if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const [y,m,d]=s.split('-').map(Number);if(y<1900||m<1||m>12)return false;const days=[31,(y%4===0&&(y%100!==0||y%400===0))?29:28,31,30,31,30,31,31,30,31,30,31];return d>=1&&d<=days[m-1]}
const localTime=()=>{const d=new Date();return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`};
const validTime=s=>typeof s==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(s);
const WALLETS=['cash','bank'], WALLET_KEY='pocketflow.wallets.v1';
const emptyWallets=()=>({setup:false,dismissed:false,opening:{cash:0,bank:0}});
const validAmount=(n,zero=false)=>Number.isFinite(n)&&(zero?n>=0:n>0)&&n<=999999999.99&&Math.abs(n*100-Math.round(n*100))<.00001;
const validWalletState=w=>w&&typeof w==='object'&&Object.keys(w).every(k=>['setup','dismissed','opening'].includes(k))&&typeof w.setup==='boolean'&&typeof w.dismissed==='boolean'&&w.opening&&Object.keys(w.opening).every(k=>WALLETS.includes(k))&&validAmount(w.opening.cash,true)&&validAmount(w.opening.bank,true)&& (w.setup||(w.opening.cash===0&&w.opening.bank===0));
function valid(t){try{if(!t||typeof t.id!=='string'||!validAmount(t.amount)||typeof t.note!=='string'||t.note.length>200||typeof t.date!=='string'||!validDate(t.date)||(t.time!==undefined&&!validTime(t.time)))return false;
if(t.type==='transfer')return t.category===null&&(t.wallet==null)&&WALLETS.includes(t.fromWallet)&&WALLETS.includes(t.toWallet)&&t.fromWallet!==t.toWallet;
return ['income','expense'].includes(t.type)&&categories[t.type].includes(t.category)&&(t.wallet==null||WALLETS.includes(t.wallet))&&t.fromWallet==null&&t.toWallet==null;
}catch{return false}}
const SETUP_KEY='pocketflow.initialSetupCompleted.v1';
let walletState=emptyWallets(),walletStorageBlocked=false,setupExpanded=false,firstRunMode=false;
try{const raw=localStorage.getItem(WALLET_KEY);if(raw){const w=JSON.parse(raw);if(!validWalletState(w))throw Error();walletState=w}}catch{walletStorageBlocked=true;setTimeout(()=>toast(tr('ไม่สามารถอ่านข้อมูลกระเป๋าได้ ข้อมูลเดิมยังถูกเก็บไว้')),0)}
// An additive UI flag: never rewrite financial data during existing-user migration.
try{
  if(localStorage.getItem(SETUP_KEY)!=='true'){
    const priorUse=[KEY,WALLET_KEY,'pocketflow.language','pocketflow.theme'].some(key=>localStorage.getItem(key)!==null);
    if(priorUse)localStorage.setItem(SETUP_KEY,'true');
    else setupExpanded=!walletStorageBlocked;
  }
}catch{setupExpanded=false}
const walletName=key=>tr(key==='cash'?'เงินสด':key==='bank'?'เงินในบัญชี':'ไม่ระบุกระเป๋า');
const activityName=t=>t.type==='transfer'?tr('โอนเงิน'):categoryName(t.category);
const typeName=type=>tr(type==='income'?'รายรับ':type==='expense'?'รายจ่าย':'โอนเงิน');
const signedMoney=n=>(n<0?'−':'')+money(Math.abs(n));
function walletBalances(){const balances={cash:Math.round(walletState.opening.cash*100),bank:Math.round(walletState.opening.bank*100)};for(const t of entries){const value=Math.round(t.amount*100);if(t.type==='transfer'){balances[t.fromWallet]-=value;balances[t.toWallet]+=value}else if(WALLETS.includes(t.wallet))balances[t.wallet]+=t.type==='income'?value:-value}return {...balances,total:balances.cash+balances.bank}}

let entries=[],filter='all',limit=10,editing=null,pending=null,allTime=false,storageBlocked=false;
function toast(message){$('#toast').dataset.messageKey=messageKey(message);$('#toast').textContent=message;$('#toast').style.display='block';clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').style.display='none',4000)}
try{const raw=localStorage.getItem(KEY);if(raw){const data=migrate(JSON.parse(raw));if(!Array.isArray(data)||!data.every(valid))throw Error('invalid');entries=data;if(raw!==JSON.stringify(data))localStorage.setItem(KEY,JSON.stringify(data))}if(localStorage.getItem('pocketflow.theme')==='dark')document.body.classList.add('dark')}catch{storageBlocked=true;setTimeout(()=>toast(tr("ไม่สามารถอ่านข้อมูลเดิมได้ กรุณาสำรองข้อมูลเบราว์เซอร์ก่อนใช้งาน")),0)}
function save(next){if(storageBlocked){toast(tr("ไม่สามารถบันทึกได้ เนื่องจากอ่านข้อมูลเดิมไม่สำเร็จ"));return false}try{localStorage.setItem(KEY,JSON.stringify(next));entries=next;return true}catch{toast(tr("บันทึกไม่สำเร็จ พื้นที่จัดเก็บอาจเต็มหรือถูกปิดใช้งาน"));return false}}
$('#month').value=today().slice(0,7);
const text=(tag,value,cls)=>{const e=document.createElement(tag);e.textContent=value;if(cls)e.className=cls;return e};
function selected(){return entries.filter(t=>allTime||t.date.startsWith($('#month').value))}
function render(){renderWallets();const rows=selected(),income=rows.filter(t=>t.type==='income').reduce((s,t)=>s+Math.round(t.amount*100),0),expense=rows.filter(t=>t.type==='expense').reduce((s,t)=>s+Math.round(t.amount*100),0);
$('#income').textContent=money(income);$('#expense').textContent=money(expense);$('#balance').textContent=(income<expense?'−':'')+money(Math.abs(income-expense));$('#count').replaceChildren(text('span',rows.length.toLocaleString(locale())),text('small',tr(rows.length===1?'countOne':'countOther')));$('#periodLabel').textContent=allTime?tr("ทุกช่วงเวลา"):new Date($('#month').value+'-01T12:00:00').toLocaleDateString(locale(),{month:'long',year:'numeric'});$('#all').setAttribute('aria-pressed',allTime);$('#chartTotal').textContent=money(expense);$('#monthLabel').textContent=new Intl.DateTimeFormat(locale(),{month:'long',year:'numeric'}).format(new Date($('#month').value+'-01T12:00:00')); 
const totals=categories.expense.map((name,i)=>({name,color:colors[i],value:rows.filter(t=>t.type==='expense'&&t.category===name).reduce((s,t)=>s+Math.round(t.amount*100),0)})).filter(c=>c.value).sort((a,b)=>b.value-a.value);let angle=0;const gradient=totals.map(c=>{const start=angle;angle+=c.value/expense*100;return `${c.color} ${start}% ${angle}%`});$('#chart').style.background=expense?`conic-gradient(${gradient.join(',')})`:'var(--line)';$('#chart').setAttribute('aria-label',expense?tr("รายจ่ายตามหมวดหมู่ ")+totals.map(c=>categoryName(c.name)+' '+money(c.value)).join(', '):tr("ยังไม่มีรายจ่าย"));$('#categories').replaceChildren();
for(const c of totals){const el=text('div','','category'),sw=text('span','','swatch');sw.style.background=c.color;const label=text('span',categoryName(c.name));label.append(text('small',Math.round(c.value/expense*100)+'%'));el.append(sw,label,text('b',money(c.value)));$('#categories').append(el)}if(!totals.length)$('#categories').append(text('p',tr("เมื่อมีรายจ่าย คุณจะเห็นสัดส่วนการใช้เงินที่นี่"),'empty'));
const visible=rows.filter(t=>filter==='all'||t.type===filter).sort((a,b)=>b.date.localeCompare(a.date)||(b.time||'').localeCompare(a.time||'')||(b.createdAt||'').localeCompare(a.createdAt||''));$('#list').replaceChildren();
if(!visible.length){const e=text('div','','empty');e.append(text('span','↗','empty-symbol'),text('h3',tr("พื้นที่เล็ก ๆ สำหรับเรื่องเงินของคุณ")),text('p',tr("ยังไม่มีรายการในช่วงนี้ ลองเพิ่มรายรับหรือรายจ่ายได้เลย")));$('#list').append(e)}
for(const t of visible.slice(0,limit)){const el=text('article','','entry'),detail=text('div',''),right=text('div','','entry-right'),actions=text('div','','actions');detail.append(text('b',activityName(t)));detail.append(text('small',t.type==='transfer'?walletName(t.fromWallet)+' → '+walletName(t.toWallet):walletName(t.wallet),'wallet-context'));if(t.note)detail.append(text('p',t.note));const date=text('time',new Date(t.date+'T12:00:00').toLocaleDateString(locale(),{day:'numeric',month:'short',year:'numeric'})+(t.time?' · '+t.time:''));date.dateTime=t.date+(t.time?'T'+t.time:'');detail.append(date);right.append(text('strong',(t.type==='income'?'+':t.type==='expense'?'−':'')+money(Math.round(t.amount*100)),t.type));for(const [label,fn] of [[tr("แก้ไข"),()=>openEditor(t)],[tr("ลบ"),()=>{pending=t.id;showAppDialog($('#confirmation'));$('#cancelDelete').focus()}]]){const b=text('button',label);b.setAttribute('aria-label',label+' '+activityName(t)+' '+t.date);b.onclick=fn;actions.append(b)}right.append(actions);const badge=text('span',t.type==='income'?'↓':t.type==='expense'?'↑':'⇄','badge '+t.type);badge.setAttribute('aria-label',typeName(t.type));el.append(badge,detail,right);$('#list').append(el)}$('#more').hidden=visible.length<=limit;requestAnimationFrame(fitAmounts);
}
function populate(){ $('#category').replaceChildren(...(categories[$('#type').value]||[]).map(c=>{const o=text('option',categoryName(c));o.value=c;return o}));syncWalletForm() }
function openEditor(t){editing=t?.id||null;$('#form').reset();$('#type').value=t?.type||'expense';populate();$('#category').value=t?.category||categories[$('#type').value]?.[0]||'';$('#wallet').value=t?.wallet||'';$('#fromWallet').value=t?.fromWallet||'bank';syncWalletForm();$('#date').value=t?.date||today();$('#time').value=t?(t.time||''):localTime();$('#time').required=!t||!!t.time;$('#amount').value=t?.amount||'';$('#note').value=t?.note||'';clearSubmitError();$('#formTitle').textContent=t?tr("แก้ไขรายการ"):tr("เพิ่มรายการ");showAppDialog($('#editor'));$('#amount').focus()}
document.querySelectorAll('.add').forEach(b=>b.onclick=()=>openEditor());$('#type').onchange=populate;$('#close').onclick=()=>$('#editor').close();
// Keep one native form submit handler for both mouse and touch submission.
let transactionSubmitting=false;
function newTransactionId(){
  let id;
  do{
    if(typeof globalThis.crypto?.randomUUID==='function')id=globalThis.crypto.randomUUID();
    else{const bytes=new Uint8Array(16);globalThis.crypto.getRandomValues(bytes);bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;const h=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');id=h.slice(0,8)+'-'+h.slice(8,12)+'-'+h.slice(12,16)+'-'+h.slice(16,20)+'-'+h.slice(20)}
  }while(entries.some(t=>t.id===id));
  return id;
}
function clearSubmitError(){
  const error=$('#error');$('#form').classList.remove('has-error');error.textContent='';delete error.dataset.messageKey;
  $('#form').querySelectorAll('[aria-invalid]').forEach(e=>e.removeAttribute('aria-invalid'));
  $('#form').querySelector('button[type=submit]').before(error);
}
function submitError(key,field){
  const error=$('#error');$('#form').classList.add('has-error');error.dataset.messageKey=key;error.textContent=tr(key);
  field.setAttribute('aria-invalid','true');field.setAttribute('aria-describedby','error');
  const label=field.closest('label');if(label)label.after(error);
  field.focus({preventScroll:true});
  requestAnimationFrame(()=>{
    keepSheetFieldVisible();
    if(matchMedia('(max-width:650px)').matches){const form=$('#form'),box=form.getBoundingClientRect(),header=form.querySelector('.section-head').getBoundingClientRect(),f=field.getBoundingClientRect(),r=error.getBoundingClientRect();if(r.bottom>box.bottom-16&&r.bottom-f.top<box.bottom-header.bottom-28)form.scrollTop+=r.bottom-box.bottom+16}
  });
}
$('#form').onsubmit=e=>{
  e.preventDefault();if(transactionSubmitting||!$('#editor').open)return;
  clearSubmitError();const amountText=$('#amount').value,amount=Number(amountText),date=$('#date').value,time=$('#time').value,type=$('#type').value,wallet=$('#wallet').value,fromWallet=$('#fromWallet').value,toWallet=$('#toWallet').value,previous=entries.find(t=>t.id===editing);
  if(!amountText.trim()){submitError('กรุณากรอกจำนวนเงิน',$('#amount'));return}
  if(!validAmount(amount)){submitError('กรอกจำนวนเงินมากกว่า 0 ไม่เกิน 999,999,999.99 บาท และทศนิยมไม่เกิน 2 ตำแหน่ง',$('#amount'));return}
  if(!date){submitError('กรุณาเลือกวันที่',$('#date'));return}
  if(!validDate(date)){submitError('กรุณาเลือกวันที่ที่ถูกต้อง (ตั้งแต่ปี 1900)',$('#date'));return}
  if((time&&!validTime(time))||(!time&&(!previous||previous.time))){submitError('กรุณาเลือกเวลาที่ถูกต้อง',$('#time'));return}
  if(type!=='transfer'&&!categories[type]?.includes($('#category').value)){submitError('กรุณาเลือกประเภทและหมวดหมู่',$('#category'));return}
  if(type==='transfer'&&(!walletState.setup||walletStorageBlocked)){submitError('ตั้งกระเป๋าก่อนเริ่มโอนเงิน',$('#type'));return}
  if(type==='transfer'&&(!WALLETS.includes(fromWallet)||!WALLETS.includes(toWallet)||fromWallet===toWallet)){submitError('กรุณาเลือกกระเป๋าต้นทางและปลายทางต่างกัน',$('#fromWallet'));return}
  if(type!=='transfer'&&walletState.setup&&!WALLETS.includes(wallet)&&!(editing&&previous?.type!=='transfer'&&previous?.wallet==null&&wallet==='')){submitError('กรุณาเลือกกระเป๋าเงินที่ถูกต้อง',$('#wallet'));return}
  transactionSubmitting=true;
  try{
    const now=new Date().toISOString(),t={id:editing||newTransactionId(),type,amount:Math.round(amount*100)/100,category:type==='transfer'?null:$('#category').value,wallet:type==='transfer'?null:walletState.setup?(wallet||null):null,...(type==='transfer'?{fromWallet,toWallet}:{}),date,...(time?{time}:{}),note:$('#note').value.trim(),createdAt:previous?.createdAt||now,updatedAt:now};
    if(!save(editing?entries.map(x=>x.id===editing?t:x):[...entries,t])){submitError('บันทึกไม่สำเร็จ พื้นที่จัดเก็บอาจเต็มหรือถูกปิดใช้งาน',$('#form button[type=submit]'));return}
    if(!allTime)$('#month').value=date.slice(0,7);filter='all';syncTabs();limit=10;render();$('#editor').close();toast(tr('บันทึกรายการแล้ว'));
  }catch{submitError('บันทึกรายการไม่สำเร็จ กรุณาลองอีกครั้ง',$('#form button[type=submit]'))}
  finally{transactionSubmitting=false}
};
$('#cancelDelete').onclick=()=>$('#confirmation').close();$('#confirmDelete').onclick=()=>{if(save(entries.filter(t=>t.id!==pending))){$('#confirmation').close();render();toast(tr("ลบรายการแล้ว"))}};
function syncTabs(){document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.filter===filter))}
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;limit=10;syncTabs();render()});$('#month').onchange=()=>{if(!/^\d{4}-\d{2}$/.test($('#month').value))$('#month').value=today().slice(0,7);allTime=false;limit=10;render()};
function shiftMonth(n){const d=new Date($('#month').value+'-01T12:00:00');d.setMonth(d.getMonth()+n);$('#month').value=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');allTime=false;limit=10;render()}
$('#prev').onclick=()=>shiftMonth(-1);$('#next').onclick=()=>shiftMonth(1);$('#all').onclick=()=>{allTime=!allTime;limit=10;render()};$('#more').onclick=()=>{limit+=10;render()};$('#theme').onclick=()=>{document.body.classList.toggle('dark');try{localStorage.setItem('pocketflow.theme',document.body.classList.contains('dark')?'dark':'light')}catch{toast(tr("ไม่สามารถจำโหมดสีในเบราว์เซอร์นี้ได้"))}};
$('#export').onclick=()=>{if(!entries.length){toast(tr("ยังไม่มีรายการให้ส่งออก"));return}const cell=v=>'"'+String(v).replace(/^[=+\-@\t\r]/,"'$&").replaceAll('"','""')+'"';const csv='\uFEFF'+[[tr('วันที่'),tr('ประเภท'),tr('หมวดหมู่'),tr('จำนวนเงิน (บาท)'),tr('รายละเอียด'),tr('กระเป๋าเงิน'),tr('จาก'),tr('ไปยัง'),tr('เวลาที่ทำรายการ')],...entries.map(t=>[t.date,typeName(t.type),t.type==='transfer'?'':categoryName(t.category),t.amount.toFixed(2),t.note,t.type==='transfer'?'':walletName(t.wallet),t.type==='transfer'?walletName(t.fromWallet):'',t.type==='transfer'?walletName(t.toWallet):'',t.time||''])].map(r=>r.map(cell).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='pocketflow-'+today()+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast(tr('ส่งออกทุกรายการแล้ว'))};
window.addEventListener('storage',e=>{if(e.key===KEY){try{const data=migrate(JSON.parse(e.newValue||'[]'));if(!Array.isArray(data)||!data.every(valid))throw Error();entries=data;render()}catch{toast(tr("ข้อมูลเปลี่ยนแปลงจากแท็บอื่น กรุณาโหลดหน้าใหม่"))}}});document.querySelectorAll('[data-language]').forEach(b=>b.onclick=()=>switchLanguage(b.dataset.language));applyLanguage();

// Presentation only: fit the already-formatted amounts to their current containers.
function fitAmounts(){
  const range=document.createRange();
  document.querySelectorAll('.summary strong:not(#count),.donut strong,.entry-right strong,.category b,.wallet-value').forEach(el=>{
    el.style.fontSize='';const style=getComputedStyle(el);range.selectNodeContents(el);
    const measured=range.getBoundingClientRect().width,available=el.clientWidth;
    if(available>0&&measured>available)el.style.fontSize=(parseFloat(style.fontSize)*available/measured*.98)+'px';
  });
}
const amountResizeObserver=new ResizeObserver(()=>requestAnimationFrame(fitAmounts));
amountResizeObserver.observe(document.querySelector('.app'));
document.fonts.ready.then(fitAmounts);

// Backup format v1: validated, language-neutral transactions and two UI preferences.
const backupKeys=[KEY,'pocketflow.language','pocketflow.theme',WALLET_KEY];
let stagedRestore=null;
function backupError(key){$('#backupError').dataset.messageKey=key;$('#backupError').textContent=key?tr(key):''}
function validateBackup(value){
  const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
  if(!object(value)||value.app!=='POCKETFLOW'||![1,2].includes(value.version)||typeof value.exportedAt!=='string'||!Number.isFinite(Date.parse(value.exportedAt))||!Array.isArray(value.transactions)||!object(value.preferences)||!['th','en'].includes(value.preferences.language)||!['light','dark'].includes(value.preferences.theme))throw Error('invalid');
  if(value.transactions.length>50000)throw Error('size');
  if(value.version===2&&!validWalletState(value.wallets))throw Error('invalid');if(value.version===1&&value.transactions.some(t=>t?.type==='transfer'))throw Error('invalid');if(value.version===2&&!value.wallets.setup&&value.transactions.some(t=>t?.type==='transfer'||t?.wallet!=null))throw Error('invalid');
  const ids=new Set(),fields=['id','type','amount','category','date','note','createdAt','updatedAt',...(value.version===2?['wallet','fromWallet','toWallet','time']:[])];
  for(const t of value.transactions){
    if(!object(t)||!valid(t)||!t.id.trim()||t.id.length>200||ids.has(t.id)||Math.abs(t.amount*100-Math.round(t.amount*100))>.00001||Object.keys(t).some(k=>!fields.includes(k)))throw Error('invalid');
    for(const key of ['createdAt','updatedAt'])if(key in t&&(typeof t[key]!=='string'||!Number.isFinite(Date.parse(t[key]))))throw Error('invalid');
    ids.add(t.id);
  }
  return {app:'POCKETFLOW',version:2,exportedAt:value.exportedAt,transactions:value.transactions,wallets:value.version===2?value.wallets:emptyWallets(),preferences:{language:value.preferences.language,theme:value.preferences.theme}};
}
$('#backup').onclick=()=>{
  backupError('');
  try{
    if(storageBlocked||walletStorageBlocked)throw Error('storage');
    const data=validateBackup({app:'POCKETFLOW',version:2,exportedAt:new Date().toISOString(),transactions:JSON.parse(localStorage.getItem(KEY)||'[]'),wallets:JSON.parse(localStorage.getItem(WALLET_KEY)||JSON.stringify(emptyWallets())),preferences:{language,theme:document.body.classList.contains('dark')?'dark':'light'}});
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    if(blob.size>10*1024*1024)throw Error('size');
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='pocketflow-backup-'+today()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast(tr('สำรองข้อมูลแล้ว'));
  }catch(e){backupError(e.message==='size'?'ไฟล์ใหญ่เกินไป (สูงสุด 10 MB หรือ 50,000 รายการ)':'ไม่สามารถอ่านหรือสำรองข้อมูลได้ ข้อมูลปัจจุบันยังไม่ถูกแก้ไข')}
};
$('#restore').onclick=()=>{backupError('');$('#restoreFile').value='';$('#restoreFile').click()};
$('#restoreFile').onchange=async()=>{
  const file=$('#restoreFile').files[0];if(!file)return;
  try{
    if(file.size>10*1024*1024)throw Error('size');
    const data=validateBackup(JSON.parse((await file.text()).replace(/^\uFEFF/,'')));
    const snapshot=backupKeys.map(key=>localStorage.getItem(key));
    stagedRestore={data,snapshot};$('#restoreCurrent').textContent=entries.length.toLocaleString(locale());$('#restoreIncoming').textContent=data.transactions.length.toLocaleString(locale());showAppDialog($('#restoreDialog'));$('#cancelRestore').focus();
  }catch(e){stagedRestore=null;backupError(e.message==='size'?'ไฟล์ใหญ่เกินไป (สูงสุด 10 MB หรือ 50,000 รายการ)':'ไฟล์สำรองไม่ถูกต้องหรือไม่รองรับ กรุณาเลือกไฟล์ JSON ของ POCKETFLOW เวอร์ชัน 1 หรือ 2')}
};
$('#restoreDialog').addEventListener('close',()=>{stagedRestore=null});
$('#cancelRestore').onclick=()=>$('#restoreDialog').close();
$('#confirmRestore').onclick=()=>{
  if(!stagedRestore)return;
  const {data,snapshot}=stagedRestore;
  try{
    if(backupKeys.some((key,i)=>localStorage.getItem(key)!==snapshot[i])){$('#restoreDialog').close();backupError('ข้อมูลเปลี่ยนแปลงระหว่างยืนยัน กรุณาเลือกไฟล์ใหม่เพื่อตรวจสอบอีกครั้ง');return}
    // Preferences first; the single atomic financial-data write is last.
    // If any write fails, restore the original preference values before returning.
    try{
      localStorage.setItem(backupKeys[1],data.preferences.language);
      localStorage.setItem(backupKeys[2],data.preferences.theme);
      localStorage.setItem(WALLET_KEY,JSON.stringify(data.wallets));
      localStorage.setItem(KEY,JSON.stringify(data.transactions));
    }catch(error){
      for(let i=1;i<backupKeys.length;i++){try{if(snapshot[i]===null)localStorage.removeItem(backupKeys[i]);else localStorage.setItem(backupKeys[i],snapshot[i])}catch{}}
      throw error;
    }
    entries=data.transactions;walletState=data.wallets;walletStorageBlocked=false;setupExpanded=false;$('#openingCash').value=walletState.opening.cash;$('#openingBank').value=walletState.opening.bank;storageBlocked=false;language=data.preferences.language;document.body.classList.toggle('dark',data.preferences.theme==='dark');allTime=true;filter='all';limit=10;syncTabs();applyLanguage();$('#restoreDialog').close();backupError('');toast(tr('กู้คืนข้อมูลสำเร็จ'));
  }catch{$('#restoreDialog').close();backupError('กู้คืนไม่สำเร็จ กรุณาตรวจสอบพื้นที่จัดเก็บของเบราว์เซอร์')}
};
// No automatic refresh or skipWaiting: updates take over after old clients close.
if('serviceWorker' in navigator&&window.isSecureContext&&location.protocol!=='file:'){
  navigator.serviceWorker.register('./service-worker.js',{updateViaCache:'none'}).then(registration=>{
    let lastCheck=Date.now();
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&Date.now()-lastCheck>3600000){lastCheck=Date.now();registration.update().catch(()=>{})}});
  }).catch(()=>toast(tr('ยังไม่พร้อมใช้งานออฟไลน์ กรุณาเชื่อมต่อและเปิดแอปอีกครั้ง')));
}

// Presentation-only dialog lifecycle: freeze the iOS page before native focus moves.
let dialogPageState=null;
function showAppDialog(dialog){
  if(!dialogPageState){
    dialogPageState={x:window.scrollX,y:window.scrollY,opener:document.activeElement};
    document.body.style.setProperty('--locked-page-top',-dialogPageState.y+'px');
    document.documentElement.classList.add('modal-open');document.body.classList.add('modal-open');
  }
  updateSheetViewport();
  try{dialog.showModal()}catch(error){releaseDialogPage();throw error}
}
function releaseDialogPage(){
  if(document.querySelector('dialog[open]')||!dialogPageState)return;
  const state=dialogPageState;dialogPageState=null;
  document.documentElement.classList.remove('modal-open');document.body.classList.remove('modal-open');
  document.body.style.removeProperty('--locked-page-top');
  window.scrollTo(state.x,state.y);
  if(state.opener?.isConnected)state.opener.focus({preventScroll:true});
  requestAnimationFrame(()=>{if(!dialogPageState)window.scrollTo(state.x,state.y)});
}
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('close',releaseDialogPage));
function keepSheetFieldVisible(){
  if(!$('#editor').open||!matchMedia('(max-width:650px)').matches)return;
  const field=document.activeElement,form=$('#form');
  if(!form.contains(field)||!field.matches('input,select,textarea'))return;
  const rect=field.getBoundingClientRect(),header=form.querySelector('.section-head').getBoundingClientRect(),box=form.getBoundingClientRect();
  if(rect.bottom>box.bottom-20)form.scrollTop+=rect.bottom-box.bottom+20;
  else if(rect.top<header.bottom+12)form.scrollTop-=header.bottom+12-rect.top;
}
function updateSheetViewport(){
  if(!dialogPageState)return;
  const viewport=window.visualViewport;
  document.documentElement.style.setProperty('--sheet-viewport-height',(viewport?.height||window.innerHeight)+'px');
  document.documentElement.style.setProperty('--sheet-viewport-top',(viewport?.offsetTop||0)+'px');
  requestAnimationFrame(keepSheetFieldVisible);
}
window.visualViewport?.addEventListener('resize',updateSheetViewport);
window.visualViewport?.addEventListener('scroll',updateSheetViewport);
window.addEventListener('resize',updateSheetViewport);
$('#form').addEventListener('focusin',()=>requestAnimationFrame(keepSheetFieldVisible));

// Wallet balances are derived from the baseline and all assigned activity, never cached.
function renderWallets(){
  const available=walletState.setup&&!walletStorageBlocked,balances=available?walletBalances():null;
  for(const [id,key] of [['totalMoney','total'],['cashBalance','cash'],['bankBalance','bank']])$('#'+id).textContent=available?signedMoney(balances[key]):'—';
  $('#openingDescription').textContent=tr(walletState.setup?'แก้ไขยอดตั้งต้นเดิม ระบบจะบวกและลบรายการที่ระบุกระเป๋าทั้งหมดอีกครั้ง ไม่ใช่การตั้งยอดปัจจุบันทับใหม่':'ตั้งยอดเงินที่คุณมีอยู่ตอนนี้ เพื่อเริ่มติดตามเงินสดและเงินในบัญชี รายการเก่าจะยังอยู่เหมือนเดิม');
  $('#walletSetup').textContent=tr('แก้ไขยอดเริ่มต้น');
  $('#walletModalTitle').textContent=tr(firstRunMode?'ตั้งยอดเริ่มต้น':'แก้ไขยอดเริ่มต้น');
  $('#walletSave').textContent=tr(firstRunMode?'บันทึกและเริ่มใช้งาน':'บันทึกยอดเริ่มต้น');
  $('#walletLater').textContent=tr(firstRunMode?'ข้ามไปก่อน':'ยกเลิกการแก้ไข');
  $('#type option[value=transfer]').disabled=!available;
  updateOpeningTotal();
}
function syncWalletForm(){
  const transfer=$('#type').value==='transfer',legacy=editing&&entries.find(t=>t.id===editing)?.type!=='transfer'&&entries.find(t=>t.id===editing)?.wallet==null;
  $('#walletField').hidden=transfer||!walletState.setup||walletStorageBlocked;
  $('#transferFields').hidden=!transfer;$('#categoryField').hidden=transfer;$('#category').required=!transfer;
  $('#walletFieldTitle').textContent=tr($('#type').value==='income'?'รับเงินเข้า':'จ่ายจาก');
  $('#wallet option[value=""]').textContent=tr(legacy?'ไม่ระบุกระเป๋า':'เลือกกระเป๋า');
  $('#toWallet').value=$('#fromWallet').value==='cash'?'bank':'cash';
  $('#walletHelp').textContent=transfer?tr('โอนไม่เพิ่มรายรับหรือรายจ่าย'):legacy&&walletState.setup?tr('การระบุกระเป๋าให้รายการเก่าจะเปลี่ยนยอดกระเป๋าปัจจุบัน'):'';
}
function updateOpeningTotal(){const a=Number($('#openingCash').value),b=Number($('#openingBank').value);$('#openingTotal').textContent=validAmount(a,true)&&validAmount(b,true)?money(Math.round(a*100)+Math.round(b*100)):'—'}
function persistWallets(next){
  if(walletStorageBlocked){toast(tr('ไม่สามารถอ่านข้อมูลกระเป๋าได้ ข้อมูลเดิมยังถูกเก็บไว้'));return false}
  try{localStorage.setItem(WALLET_KEY,JSON.stringify(next));walletState=next;return true}catch{toast(tr('บันทึกข้อมูลกระเป๋าไม่สำเร็จ'));return false}
}
$('#openingCash').value=walletState.opening.cash;$('#openingBank').value=walletState.opening.bank;
$('#openingCash').oninput=updateOpeningTotal;$('#openingBank').oninput=updateOpeningTotal;
function completeInitialSetup(){
  try{localStorage.setItem(SETUP_KEY,'true');setupExpanded=false;return true}
  catch{$('#walletError').dataset.messageKey='บันทึกข้อมูลกระเป๋าไม่สำเร็จ';$('#walletError').textContent=tr('บันทึกข้อมูลกระเป๋าไม่สำเร็จ');return false}
}
function openWalletModal(firstRun=false){
  firstRunMode=firstRun;$('#openingCash').value=walletState.opening.cash;$('#openingBank').value=walletState.opening.bank;
  $('#walletError').textContent='';delete $('#walletError').dataset.messageKey;renderWallets();
  showAppDialog($('#walletDialog'));$('#openingBank').focus();
}
$('#walletSetup').onclick=()=>openWalletModal();
$('#walletLater').onclick=()=>{
  if(firstRunMode){
    if(!persistWallets({...walletState,dismissed:true})||!completeInitialSetup())return;
  }
  $('#walletDialog').close();renderWallets();
};
$('#walletDialog').addEventListener('cancel',event=>{event.preventDefault();$('#walletLater').click()});
$('#walletForm').onsubmit=e=>{
  e.preventDefault();const cash=Number($('#openingCash').value),bank=Number($('#openingBank').value);
  if(!$('#openingCash').value||!$('#openingBank').value||!validAmount(cash,true)||!validAmount(bank,true)){$('#walletError').dataset.messageKey='กรอกยอดเริ่มต้นตั้งแต่ 0 ถึง 999,999,999.99 บาท ทศนิยมไม่เกิน 2 ตำแหน่ง';$('#walletError').textContent=tr($('#walletError').dataset.messageKey);return}
  if(persistWallets({setup:true,dismissed:true,opening:{cash:Math.round(cash*100)/100,bank:Math.round(bank*100)/100}})&&completeInitialSetup()){$('#walletDialog').close();$('#walletError').textContent='';delete $('#walletError').dataset.messageKey;render();toast(tr('ตั้งค่ากระเป๋าแล้ว'))}
};
$('#fromWallet').onchange=syncWalletForm;
window.addEventListener('storage',event=>{if(event.key===WALLET_KEY){try{const w=JSON.parse(event.newValue||JSON.stringify(emptyWallets()));if(!validWalletState(w))throw Error();walletState=w;walletStorageBlocked=false;setupExpanded=false;render();syncWalletForm()}catch{walletStorageBlocked=true;render();toast(tr('ไม่สามารถอ่านข้อมูลกระเป๋าได้ ข้อมูลเดิมยังถูกเก็บไว้'))}}});

// When the normal floating position intersects wallet cards, use the small gap
// immediately below those cards. No dock; elsewhere the pill remains fixed.
let walletFabFrame=0;
function positionWalletAdd(){
  walletFabFrame=0;const button=$('.mobile-add'),section=$('.wallet-section');
  if(!matchMedia('(max-width:650px)').matches){button.classList.remove('wallet-clearance');section.classList.remove('fab-clearance');return}
  if(dialogPageState)return;
  button.classList.remove('wallet-clearance');
  const pill=button.getBoundingClientRect(),cards=$('.wallet-cards').getBoundingClientRect();
  const overlaps=pill.top<cards.bottom+8&&pill.bottom>cards.top-8;
  section.classList.toggle('fab-clearance',overlaps);
  if(overlaps){button.style.setProperty('--wallet-fab-top',(cards.bottom+window.scrollY+12)+'px');button.classList.add('wallet-clearance')}
}
function scheduleWalletAdd(){if(!walletFabFrame)walletFabFrame=requestAnimationFrame(positionWalletAdd)}
window.addEventListener('scroll',scheduleWalletAdd,{passive:true});window.addEventListener('resize',scheduleWalletAdd);
window.visualViewport?.addEventListener('resize',scheduleWalletAdd);
new ResizeObserver(scheduleWalletAdd).observe($('.wallet-section'));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('close',scheduleWalletAdd));
document.fonts.ready.then(scheduleWalletAdd);

// Open only after the shared modal lifecycle and all controls are initialized.
if(setupExpanded)openWalletModal(true);

UPDATE portfolios
SET category = "Hasil Konstruksi"
WHERE LOWER(TRIM(category)) = "hasil kontruksi";

ALTER TABLE portfolios
DROP COLUMN IF EXISTS specs;

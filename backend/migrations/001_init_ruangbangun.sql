CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(191) NOT NULL,
  subtitle VARCHAR(255) NULL,
  image VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(191) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS portfolios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(191) NOT NULL,
  category VARCHAR(191) NULL,
  description LONGTEXT NULL,
  specs JSON NULL,
  images JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  quote TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  id INT PRIMARY KEY,
  about_us LONGTEXT NULL,
  email VARCHAR(191) NULL,
  phone VARCHAR(100) NULL,
  address TEXT NULL,
  maps_url TEXT NULL,
  faqs JSON NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO settings (id, about_us, email, phone, address, maps_url, faqs)
VALUES (
  1,
  'Kami telah mendesain hunian dan komersial untuk memenuhi kebutuhan klien di seluruh Indonesia sejak tahun 2019. Kami menawarkan layanan desain dan pengembangan mulai dari konseptualisasi hingga realisasi.',
  'hello@ruangbangun.id',
  '+62 812-3456-7890',
  'Jakarta, Indonesia',
  '',
  JSON_ARRAY(
    JSON_OBJECT('q','Layanan apa saja yang diberikan oleh Ruang Bangun?','a','Ruang Bangun menyediakan layanan desain saja, desain dan konstruksi, dan kontraktor saja untuk arsitektur dan interior'),
    JSON_OBJECT('q','Kota mana saja yang dicakup oleh Ruang Bangun?','a','Untuk desain kami mencakup seluruh Indonesia dan mancanegara. Untuk konstruksi fokus Jabodetabek dan Lampung.')
  )
)
ON DUPLICATE KEY UPDATE id=id;

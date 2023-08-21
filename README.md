# SHORT URL

## Tabela principal de URLs

```sql
CREATE TABLE URLs (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  original_url VARCHAR(255) NOT NULL,
  short_code VARCHAR(10) NOT NULL,
  click_count INT DEFAULT '0',
  created_at VARCHAR(255) DEFAULT NULL,
  owner INT
);
```

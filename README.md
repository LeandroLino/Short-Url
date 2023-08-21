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

## Rotas

Uma API de encurtamento de URLs.

## POST /short/ - Encurtando uma URL:

```
{
	"url": "https://google.com/"
}
```

**RESPONSE STATUS -> HTTP 200**

```
{
	"url": "C1f1Ky"
}
```

## POST /get-short/ - Acessando uma URL encurtada:

```
{
	"url": "C1f1Ky"
}
```

**RESPONSE STATUS -> HTTP 200**

```
{
	"url": "https://google.com/"
}
```

## POST /get-info/ - Acessando informações de uma URL encurtada:

```
{
	"url": "C1f1Ky"
}
```

**RESPONSE STATUS -> HTTP 200**

```
{
	"id": 1,
	"original_url": "https://google.com/",
	"short_code": "C1f1Ky",
	"click_count": 1,
	"created_at": "2023-08-21",
	"owner": null
}
```

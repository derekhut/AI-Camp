CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at timestamptz,
    nickname VARCHAR(255),
    avatar_url VARCHAR(255),
    locale VARCHAR(50),
    signin_type VARCHAR(50),
    signin_ip VARCHAR(255),
    signin_provider VARCHAR(50),
    signin_openid VARCHAR(255),
    UNIQUE (email, signin_provider)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_no VARCHAR(255) UNIQUE NOT NULL,
    created_at timestamptz,
    user_uuid VARCHAR(255) NOT NULL DEFAULT '',
    user_email VARCHAR(255) NOT NULL DEFAULT '',
    amount INT NOT NULL,
    interval VARCHAR(50),
    expired_at timestamptz,
    status VARCHAR(50) NOT NULL,
    stripe_session_id VARCHAR(255),
    credits INT NOT NULL,
    currency VARCHAR(50),
    sub_id VARCHAR(255),
    sub_interval_count int,
    sub_cycle_anchor int,
    sub_period_end int,
    sub_period_start int,
    sub_times int,
    product_id VARCHAR(255),
    product_name VARCHAR(255),
    valid_months int,
    order_detail TEXT,
    paid_at timestamptz,
    paid_email VARCHAR(255),
    paid_detail TEXT
);

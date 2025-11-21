# Getting Started

## 1. The Main Goal

This project aims to develop a **Microservice** system for e-commerce.
* Use Spring Boot 4.x.
* Centralized data management for each service.

## 2. The Developed Services
The following services are currently active:

0.  **gateway-service**: Provides API gateway and authentication.
1.  **auth-service**: Provides authentication and authorization.
2.  **registry-service**: Provides service registration and discovery.
3.  **config-service**: Provides centralized configuration management.
4. **common**: Provides common functions for other services.
    * Error handling.
        * Business exception: `BusinessException` for business-related errors.
        * Global exception handler.
5. **notification-service**: Provides notification services.
6. **user-service**: Manages user information and authentication.
7. **product-service**: Manages inventory and product information.
8. **order-service**: Processes order transactions.
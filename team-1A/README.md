
High Level Design on Scrabble Project

Project Overview 

 

Purpose 

The purpose of the described online Scrabble project is to provide a fun, engaging, and competitive multiplayer gaming experience for Scrabble enthusiasts. By incorporating features like real-time gameplay, the ability to invite friends, and a dynamic leaderboard, the project aims to create a social and competitive platform where players can challenge each other, track their progress, and compete for rankings. 

  1.2 Audience 

The audience for the online Scrabble project includes: 

1. Casual Players: People who enjoy playing Scrabble for fun & relaxation with friends or family. 

2. Competitive Players: Enthusiasts looking for a challenging platform with rankings and leaderboards to test their skills. 

3. Social Groups: Friends, families, or colleagues seeking a fun, social activity to play together. 

   1.3 Design Process 

     The design process for the online Scrabble project: 

1. Requirements Gathering: Identify player and admin needs (e.g., multiplayer, leaderboard, game management). 

2. System Architecture: Design the client-server structure with real-time gameplay and scalable backend. 

3. Module Design: Define key features—game creation, invitations, leaderboard, and admin controls for game management. 

4. Database Design: Structure tables for users, games, leaderboards, and word dictionaries. 

5. Prototyping: Create wireframes and basic gameplay flows for player interaction and admin interfaces. 

6. Development: Build frontend (React) and backend (Node.js, WebSockets), ensuring real-time updates and scalability. 

7. Testing: Conduct functional, performance, and security tests to ensure stability and smooth user experience. 

8. Launch & Iteration: Deploy the platform and refine based on user feedback. 


2.Requirements 

 Functional Requirements: 

Game Creation: Players can create and join Scrabble games. 

Invitations: Players can share game links to invite friends. 

Real-Time Gameplay: Real-time updates during the game, using WebSockets. 

Leaderboard: Players can view the leaderboard and their rank. 

Word Dictionary Management: Admins can manage valid word dictionaries. 

Game Board Management: Admins can add or update game boards. 

Extensibility: Ability to introduce new game types in the future. 

Architecture 

 Server versions refer to different editions of server software released by companies like Microsoft (for Windows Server), Red Hat (for Linux), or other providers. Each version typically offers varying levels of features, performance, and support for enterprise needs. 

 

For example, Windows Server has various versions such as: 

- **Windows Server 2022** 

- **Windows Server 2019** 

- **Windows Server 2016** 

- **Windows Server 2012 R2**, etc. 

 

Each version comes with updates in security, scalability, and virtualization capabilities, among other features. Linux servers, on the other hand, may have distributions like Red Hat Enterprise Linux (RHEL), Ubuntu Server, or CentOS in different versions. 

 

Server roles refer to the primary functions or services that a server provides in a network. Common server roles include: 

1. Domain Controller (Active Directory) – Manages user accounts, groups, and network security policies. 

2. Web Server (IIS/Apache/Nginx) – Hosts websites or web applications. 

3. File Server– Manages and stores shared files and directories for network users. 

4. Database Server (SQL Server, MySQL, PostgreSQL) – Hosts and manages databases. 

5. Print Server – Manages and controls printers on a network. 

6. DNS Server – Resolves domain names to IP addresses for network devices. 

7. DHCP Server – Assigns IP addresses to devices in a network dynamically. 

8. Mail Server (Exchange Server/Postfix) – Handles sending, receiving, and managing emails. 

9. Hyper-V/VMware ESXi (Virtualization) – Provides infrastructure for running multiple virtual machines (VMs) on the same physical hardware. 

 

Server roles are essential for defining the specific function a server will perform within a network infrastructure, allowing businesses to tailor their server environment to their unique needs. 

Access 

 

Access to server versions and roles typically depends on the type of server software being used and the roles configured within the network. Here’s how access might work for each: 

1. Server Versions: 

Licensing: Access to server versions requires valid licensing from the vendor (e.g., Microsoft for Windows Server, Red Hat for RHEL). Admins need to install the licensed version of the server operating system. 

User Access: Once the server is set up, users access its services or resources based on the roles assigned to the server. For example, access to a database server would be via database management tools (e.g., SQL Server Management Studio for Windows SQL Server). 

2. Server Roles: 

Access to server roles can be configured through different levels of permissions, depending on the role: 
Domain Controller (Active Directory): Admins or users with sufficient privileges can access
AD services to manage user accounts, groups, and network policies. Permissions are defined within AD groups (e.g., Domain Admins). 

Web Server: Access can be managed through firewalls, and user permissions may be granted to website or application owners (e.g., FTP or remote access for developers). 

File Server: Access is managed through file permissions (e.g., Read/Write, Modify) which can be controlled at the folder or file level using NTFS permissions in Windows or chmod in Linux. 

Database Server: Access is managed through database-level roles and privileges (e.g., DBA roles, read/write permissions to databases). Authentication can be via Active Directory or local database users. 

DNS/DHCP Server: Admin access is required to manage these roles. Network administrators configure IP addresses or domain names. End-users typically access these services automatically without knowing it. 

Print Server: Users are given permissions to use shared printers, often through group policies or manual permissions. 

Mail Server: Access to email services is typically via email clients (e.g., Outlook, Thunderbird), with authentication being done via email accounts managed by the server admin. 
Hyper-V/Virtualization: Admins need access to manage virtual machines through tools like Hyper-V Manager, VMware vSphere, etc. Permissions can be assigned based on the user's role in the network. 
Hardware and Platform Requirements 

   Hardware Requirements: 

  Responsiveness: The game should work on all devices (mobile, tablet, desktop). 

  Scalability: Support a large number of concurrent players and games. 

  Offline Support: Handle brief internet disconnects for players without losing game progress. 

  Security: Secure user data and game states, with proper authentication and encryption. 

  Performance: Ensure low latency for real-time game updates and fast leaderboard refreshes. 
 

Technical Requirements: 

Frontend: React, WebSockets for real-time updates. 

Backend: Node.js, Express, REST APIs, WebSocket server. 

Database: MySQL/PostgreSQL for data persistence, Redis for caching game states 

System Connectivity 

1. Frontend (Player's Browser) → Backend (Game Server) 

   - WebSockets: For real-time gameplay updates (player moves, scores, game status). 

   - HTTP/REST API: For game creation, joining, leaderboard retrieval, and authentication. 

2. Backend (Game Server) → Database 

   - SQL Queries: To store and retrieve game states, player profiles, leaderboard information, and word dictionaries. 

3. Backend → Cache (Redis) 

   - Caching: Use Redis to temporarily store active game sessions and real-time game data for faster access and performance optimization. 

4.Super Admin Interface → Backend 

   - HTTP/REST API: Admins use the API to manage game boards, word dictionaries, and introduce new game types. 

5. Authentication Service → Backend 

   - OAuth/JWT: For secure player login, registration, and session management across different games and devices. 

This system ensures smooth communication between players, backend services, and data storage, supporting real-time updates and scalability. 
Standards 

 

  4.1Security Standards 

      Authentication & Authorization: 

OAuth 2.0 / JWT: Use OAuth for secure login (e.g., Google, Facebook) and JWT tokens for session management, ensuring users are authenticated and authorized. 

  Data Encryption: 

HTTPS (SSL/TLS): Encrypt all data exchanged between the client and server to protect against man-in-the-middle (MITM) attacks. 

Password Encryption: Hash and salt passwords using secure algorithms (e.g., bcrypt) before storing them in the database. 

  Access Control: 

Role-based Access Control (RBAC): Ensure that only authorized users (e.g., admins) can access sensitive features like game board and dictionary management. 

Least Privilege: Grant users the minimum level of access needed to perform their tasks. 

  Input Validation & Sanitization: 

Sanitize Input: Validate all user input to prevent SQL injection and cross-site scripting (XSS) attacks. 

CSRF Protection: Implement anti-CSRF tokens for secure form submissions. 

  Data Privacy: 

GDPR Compliance: Ensure user data is stored and processed in line with privacy regulations, allowing users to control their data. 

  Logging & Monitoring: 

Audit Logs: Track and monitor access to sensitive features and actions, especially by super admins. 

Intrusion Detection: Implement monitoring for suspicious activities like brute force attacks or unauthorized access attempts. 
Support 

1. User Support: 

   - Help Center/FAQ: Provide a comprehensive help section with common issues, game rules, and guides for creating and joining games. 

   - In-Game Tutorials: Include an onboarding tutorial for new players to understand how to navigate the platform, create games, and invite friends. 

   - Live Chat/Email Support: Offer customer support via live chat or email for technical issues, account-related queries, or troubleshooting. 

2. Technical Support: 

   - Bug Reporting: Implement an easy-to-access bug reporting feature for players to submit issues directly from the game. 

   - Real-Time Monitoring: Use monitoring tools (e.g., Datadog, New Relic) to track server performance and respond to outages or slowdowns quickly. 

   - **Service Level Agreements (SLAs)**: Define response times for different issue severity levels (e.g., critical errors, minor bugs). 

3. Admin Support: 

   - Admin Dashboard: Provide super admins with a user-friendly interface to manage game boards, word dictionaries, and view system health. 

   - Analytics: Offer usage statistics for the admin to track metrics such as player counts, active games, and server performance. 

4. Documentation: 

   - User Guide: Offer a guide for both players and super admins covering the key functionalities and features. 

   - Developer Documentation: For future extensibility, provide API documentation and guides for integrating new game types or extending functionality.

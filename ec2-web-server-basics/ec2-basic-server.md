# Step-by-Step Guide: Launching an EC2 Instance and Setting Up a Web Server

This tutorial covers launching an EC2 instance and setting up a basic web server using AWS Management Console and AWS CLI.

---
## Why?
Amazon EC2 (Elastic Compute Cloud) allows you to launch virtual servers in the cloud, giving you full control over your computing resources. Hosting a web server on EC2 is a cost-effective and scalable way to deploy websites and applications.

## Goal
By the end of this guide, you will have:
✅ Launched an EC2 instance  
✅ Connected to it via SSH  
✅ Installed and configured an Apache web server  
✅ Verified that your web server is live  


## Method 1: Using AWS Management Console (GUI)

### Step 1: Log in to AWS and Navigate to EC2
1. Go to [AWS Management Console](https://aws.amazon.com/) and log in.
2. Search for **EC2** in the AWS search bar and click **EC2 Dashboard**.

### Step 2: Launch an EC2 Instance
1. Click **Launch Instances**.
2. Enter an **Instance Name** (e.g., `MyWebServer`).
3. Under **Amazon Machine Image (AMI)**, select:
   - **Ubuntu Server 22.04 LTS** (or any preferred Linux version).
4. Under **Instance Type**, choose:
   - `t2.micro` (Free Tier eligible).
5. For **Key Pair**, select an existing key or create a new key pair:
   - Download the `.pem` file and keep it safe.
6. In **Network settings**:
   - Enable **Allow SSH traffic from My IP**.
   - Enable **HTTP (80)** to allow web traffic.
7. Click **Launch Instance**.

### Step 3: Connect to the EC2 Instance via SSH
1. Go to **Instances**, find your instance, and copy the **Public IPv4 address**.
2. Open a terminal (Mac/Linux) or use **PuTTY** (Windows).
3. Run the SSH command:

   ```sh
   ssh -i your-key.pem ubuntu@your-public-ip
   ```
- Replace your-key.pem with your downloaded key pair.
- Replace your-public-ip with the copied IP address.
- If using Windows with PuTTY, convert .pem to .ppk using PuTTYgen.

### Step 4: Install a Basic Web Server

1. Update system packages:
```sh
sudo apt update && sudo apt upgrade -y
```
2. Install Apache web server:
```sh
sudo apt install apache2 -y
```
3. Start the Apache service:
```sh
sudo systemctl start apache2
```
4. Enable Apache on boot:
```sh
sudo systemctl enable apache2
```
5. Verify installation:
```sh
systemctl status apache2
```
6. Open a browser and enter http://your-public-ip – You should see the default Apache page.

🎉 Congrats! Your web server is live.
Now you can host websites and applications on your EC2 instance!
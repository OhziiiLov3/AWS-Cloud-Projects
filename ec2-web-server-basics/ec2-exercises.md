# EC2 Exercises

## 1. Modify the Default Web Page
The default Apache page is located at `/var/www/html/index.html`. Edit it to display a custom message:

```sh
sudo nano /var/www/html/index.html
```

Replace the content with:

```html
<h1>Welcome to My First EC2 Web Server!</h1>
<p>Deployed on AWS using Ubuntu.</p>
```

Save (CTRL + X, then Y, then Enter). Refresh your browser to see the changes.

---

## 2. Host a Simple Web Application
Create a simple HTML + CSS + JavaScript webpage inside `/var/www/html/`.

```sh
sudo nano /var/www/html/index.html
```

Add:

```html
<html>
<head><title>My AWS Page</title></head>
<body>
  <h1>Hello from AWS EC2!</h1>
  <button onclick="alert('Hello, World!')">Click Me</button>
</body>
</html>
```

Refresh the browser to see the new page.

---

## 3. Set Up a Simple Python Web Server
Install Python if not installed:

```sh
sudo apt install python3 -y
```

Navigate to a test directory:

```sh
mkdir mypythonapp && cd mypythonapp
```

Start a simple HTTP server:

```sh
python3 -m http.server 8080
```

Open `http://your-public-ip:8080/` in a browser to see the Python server in action.

---

## 4. Configure a Basic Firewall (UFW)
Check firewall status:

```sh
sudo ufw status
```

Allow SSH, HTTP, and HTTPS:

```sh
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

Enable the firewall:

```sh
sudo ufw enable
```

---

## 5. Monitor Server Logs
View Apache access logs:

```sh
sudo tail -f /var/log/apache2/access.log
```

View error logs:

```sh
sudo tail -f /var/log/apache2/error.log
```

---

## 6. Automate Apache Start on Reboot
Ensure Apache starts automatically after system reboots:

```sh
sudo systemctl enable apache2
```

Reboot your instance:

```sh
sudo reboot
```

Reconnect and check:

```sh
systemctl status apache2
```

---

## 7. Secure Your EC2 Instance
Disable root login via SSH:

```sh
sudo nano /etc/ssh/sshd_config
```

Find `PermitRootLogin yes` and change it to `no`.

Restart SSH:

```sh
sudo systemctl restart ssh
```

Create a new user with limited permissions:

```sh
sudo adduser myuser
sudo usermod -aG sudo myuser
```

Use key-based SSH authentication instead of password login.

---

## 8. Install a Database (Optional)
Install MySQL:

```sh
sudo apt install mysql-server -y
```

Secure MySQL:

```sh
sudo mysql_secure_installation
```

Log in to MySQL:

```sh
sudo mysql -u root -p
```

Create a database:

```sql
CREATE DATABASE mydatabase;
```

---

## 9. Install and Configure PHP (Optional)
Install PHP:

```sh
sudo apt install php libapache2-mod-php -y
```

Create a test PHP file:

```sh
sudo nano /var/www/html/info.php
```

Add:

```php
<?php phpinfo(); ?>
```

Save and access `http://your-public-ip/info.php`.

---

## 10. Take a Snapshot & Backup
Create an Amazon Machine Image (AMI) from your instance for backup.
Go to **EC2 Dashboard → Instances → Actions → Create Image**.

---

## Next Steps
✅ Deploy a simple Node.js or Python Flask app  
✅ Set up an SSL certificate with Let's Encrypt  
✅ Use AWS S3 for static file hosting  
✅ Explore AWS Lambda, CloudFront, and Route 53 for scaling  

Let me know if you want guidance on any of these! 🚀


<p>
  <img src="https://github.com/user-attachments/assets/6b34a33f-eb36-4778-9b6c-72d6527eabef" alt="Image" width="150" align="left" style="margin-right: 10px;">
  <strong>In this Demo, we will setup an IAM user using Two different methods </strong><br>
  Follow these steps to use AWS Management Console or AWS CLIfor setup.
</p>

# Method 1: Using the AWS Management Console  

This method involves setting up an IAM user with administrator access and enabling MFA using the AWS Management Console.  

## Step 1: Create an IAM User with Administrator Access  

1. Sign in to the AWS Management Console as the root user.  
2. Navigate to **IAM (Identity and Access Management)** by searching "IAM" in the AWS search bar.  
3. In the **IAM Dashboard**, click on **Users** in the left sidebar.  
4. Click **Add users**.  
5. Enter a **User name** (e.g., `AdminUser`).  
6. Under **AWS access type**, choose:  
   ✅ **"Access key - Programmatic access"** (if needed for CLI/API access)  
   ✅ **"Password - AWS Management Console access"** (if needed for console access)  
7. Click **Next**.  

## Step 2: Attach Administrator Permissions  

1. Under **Set permissions**, select **Attach policies directly**.  
2. Search for `AdministratorAccess`.  
3. ✅ Check the box next to **AdministratorAccess**.  
4. Click **Next**.  

## Step 3: Review and Create the User  

1. Review the details.  
2. Click **Create user**.  
3. Copy and download the **access key ID** and **secret access key** (for CLI use).  

🎉 **User Created!** 🎉  
## Step 4: Enable Multi-Factor Authentication (MFA)
1. Go to IAM → Users → [Your IAM User].
2. Click on the Security credentials tab.
3. Scroll down to Assigned MFA device and click Manage.
4. Select Virtual MFA device (recommended) and click Continue.
5. Open the AWS MFA App (e.g., Google Authenticator, Authy).
6. Scan the QR code using your authenticator app.
7. Enter the two MFA codes generated in the app.
8. Click Assign MFA.
9. ✅ MFA is now enabled!



or You can create Users using the AWS CLI

Learn how to install and configure [AWS CLI here](https://docs.aws.amazon.com/cli/v1/userguide/install-macos.html)

## Method 2: Using AWS CLI
This method involves using the AWS CLI to create an IAM user, assign admin permissions, and enable MFA.

### Step 1: Create IAM User
```sh
aws iam create-user --user-name AdminUser
```
### Step 2: Attach Administrator Policy
```sh
aws iam attach-user-policy --user-name AdminUser --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```
### Step 3: Create Access Key for CLI Authentication
```sh
aws iam create-access-key --user-name AdminUser
```
Copy the AccessKeyId and SecretAccessKey for later use.

### Step 4: Enable MFA
1. List Available MFA Devices
```sh
aws iam list-virtual-mfa-devices
```

2. Create and Assign MFA Device
```sh
aws iam create-virtual-mfa-device --virtual-mfa-device-name AdminUserMFA
```
3. Enable MFA for User
Get the serial number from the previous command output.
Generate two consecutive MFA codes from the authenticator app.

Run:
```sh
aws iam enable-mfa-device --user-name AdminUser --serial-number arn:aws:iam::<AWS_ACCOUNT_ID>:mfa/AdminUserMFA --authentication-code-1 <CODE1> --authentication-code-2 <CODE2>
```
✅ MFA is now enabled for CLI! 🎉

### Final Step: Configure AWS CLI with MFA

To authenticate using MFA every time:
Run:
```sh
aws sts get-session-token --serial-number arn:aws:iam::<AWS_ACCOUNT_ID>:mfa/AdminUserMFA --token-code <MFA-CODE>
```

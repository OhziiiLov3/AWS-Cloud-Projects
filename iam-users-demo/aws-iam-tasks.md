# **Step-by-Step Guide: IAM Groups & Least Privilege Access on AWS**

### Why?
Using IAM groups instead of assigning policies directly to users follows AWS best practices for permission management. It allows for better scalability and security.

## **1. Create and Use IAM Groups**

### **Using the AWS Management Console:**
1. **Sign in to AWS Console**  
   - Go to [AWS IAM Console](https://console.aws.amazon.com/iam/).
   - Ensure you are signed in with an account that has sufficient permissions.

2. **Create an IAM Group**  
   - In the left navigation pane, click **"User groups"**.
   - Click **"Create group"**.
   - Enter **"AdminGroup"** as the group name.
   - Click **"Next"**.

3. **Attach the AdministratorAccess Policy**  
   - In the **Attach permissions policies** section, search for **"AdministratorAccess"**.
   - Check the box next to **"AdministratorAccess"**.
   - Click **"Next"** and then **"Create group"**.

4. **Add an IAM User to the Group**  
   - Click on the newly created **AdminGroup**.
   - Navigate to the **Users** tab and click **"Add users"**.
   - Select your IAM user and click **"Add users"**.

## **Using AWS CLI:**

### Create the AdminGroup
```sh
aws iam create-group --group-name AdminGroup
```
### Attach the AdministratorAccess policy to the group
```sh
aws iam attach-group-policy --group-name AdminGroup --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```
### Add an IAM user to the group (replace 'YourUserName' with actual username)
```sh
aws iam add-user-to-group --group-name AdminGroup --user-name YourUserName
```



# **Step-by-Step Guide: IAM Groups & Least Privilege Access on AWS**

### Why?
Implementing least privilege access ensures that users have only the permissions necessary to perform their tasks. This improves security and reduces the risk of accidental or malicious modifications to your AWS resources.

🚀 By following this principle, you enhance security while maintaining operational efficiency!

# **Using the AWS Management Console:**
1. **Create a New IAM User**
   - Go to the **IAM Console**.
   - Click **"Users"** in the left menu.
   - Click **"Add users"**.
   - Enter a username (e.g., **ReadOnlyUser**).
   - Select **"Access key - Programmatic access"** if needed for API/CLI access.
   - Click **"Next"**.

2. **Attach the ReadOnlyAccess Policy**
   - Click **"Attach policies directly"**.
   - Search for **"ReadOnlyAccess"** and select it.
   - Click **"Next"** and **"Create user"**.

3. **Sign in as the ReadOnly User**  
   - Use the new user’s credentials to log in via the **IAM sign-in URL**.
   - Verify that you can **view resources but cannot modify them**.

---

## **Using AWS CLI:**
### Create a new IAM user
```sh
aws iam create-user --user-name ReadOnlyUser
```
### Attach the ReadOnlyAccess policy to the user
```sh
aws iam attach-user-policy --user-name ReadOnlyUser --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess
```

### Generate access keys for the user (optional, if programmatic access is needed)
```sh
aws iam create-access-key --user-name ReadOnlyUser
```

# **3. Use IAM Policies to Restrict Access**  
## Why? 
 By restricting access to only S3, we ensure users cannot modify other services, following security best practices.

🚀 Mastering IAM policies helps in securing AWS environments while providing necessary access!

## **Using AWS Management Console**  

### **1. Create a Custom IAM Policy for S3 Access**  
1. Go to the **AWS IAM Console**: [https://console.aws.amazon.com/iam/](https://console.aws.amazon.com/iam/).  
2. In the left navigation pane, click **"Policies"**.  
3. Click **"Create policy"**.  
4. Go to the **JSON tab** and paste the following policy:  

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": "s3:*",
         "Resource": "*"
       }
     ]
   }
   ```

- This policy grants full access to S3 but restricts everything else.
Click "Next", give it a name (e.g., S3OnlyAccess), then click "Create policy".

5. Click "Next", give it a name (e.g., S3OnlyAccess), then click "Create policy".

## Create a New IAM User and Attach the Policy
In the IAM Console, go to "Users" and click "Add users".
Enter a username (e.g., S3User) and select "Access key - Programmatic access" if API/CLI access is needed.
Click "Next" and select "Attach policies directly".
Search for S3OnlyAccess (the policy created earlier) and attach it.
Click "Create user".
## Verify Access Restrictions
Sign in as the new user.
Try to list S3 buckets (this should work):
Open the AWS S3 Console and verify access.
Try to create an EC2 instance (this should be denied).
Go to the EC2 Console and attempt to launch an instance.
You should see an "Access Denied" error.

## Using AWS CLI
1. Create a Custom IAM Policy
Run the following command to create a policy named S3OnlyAccess:
```sh
aws iam create-policy --policy-name S3OnlyAccess --policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": "*"
    }
  ]
}'
```

2. Create a New IAM User**

```sh
aws iam create-user --user-name S3User
```

Attach the policy to the user:
```sh
aws iam attach-user-policy --user-name S3User --policy-arn arn:aws:iam::aws:policy/S3OnlyAccess
```

Generate an access key for programmatic access:

```sh
aws iam create-access-key --user-name S3User
```

3. Test Permissions
```sh
aws s3 ls
```
✅ You should see a list of available S3 buckets.
### Try Creating an EC2 Instance (Denied)

```sh
aws ec2 run-instances --image-id ami-1234567890abcdef0 --count 1 --instance-type t2.micro
```
❌ This should return an "Access Denied" error.

### Task Complete ✅ 
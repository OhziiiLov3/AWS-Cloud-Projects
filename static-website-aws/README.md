# Project - Host a Website on Amazon S3

### Host a Website on Amazon S3  
**By Keith L. Baskerville Jr.**  

![Drift](https://github.com/user-attachments/assets/9390ac03-883b-4981-a41a-02df018beca3)  

---

## Introducing Today's Project!  

### What is Amazon S3?  
Amazon Simple Storage or Amazon S3 is an object storage service that is built to store and retrieve any amount of data from anywhere. Any type of file can be stored in an S3.  

#### Use cases:  
- Backup/storage  
- Application and media hosting  
- Static websites  

### How I used Amazon S3 in this project  
I used Amazon S3 in today's project to host a static website by storing HTML, CSS, JavaScript, and image files in an S3 bucket.  

#### One thing I didn't expect in this project was...  
I didn't expect the process to be as seamless as it was. The speed and ease of configuration were quite impressive!  

#### This project took me...  
**20 minutes**  

---

## How I Set Up an S3 Bucket  

### Creating an S3 bucket  
Creating an S3 bucket took me **two minutes**.  

- The region I picked for my S3 bucket was **N. California** because it is closest to me.  
- **S3 bucket names are globally unique!** Once you create a bucket, no other AWS account in the world can use the same bucket name unless you delete the bucket.  

![Image](https://github.com/user-attachments/assets/eda6e939-090d-4936-897d-a2266f975f21)

---

## Upload Website Files to S3  

### Files uploaded:  
- `index.html`  
- `styles.css`  
- `script.js`  
- `assets/` (containing images and videos)  

These files are necessary because they make up the design and functionality of the website.  

![Image](https://github.com/user-attachments/assets/f0fafcce-f9e8-4104-9f1a-38a03ed1f381)

---

## Static Website Hosting on S3  

### What is website hosting?  
Website hosting makes your website public on the internet. By configuring an S3 bucket for hosting, we're telling this bucket:  
*"Please create a URL that will take anyone to a page that displays the HTML file I just uploaded."*  

### Steps to enable website hosting:  
1. Configure the bucket to use the **bucket endpoint** as the web address.  
2. Select **"Host a static Website"** in the AWS console.  
3. Enable **ACLs** (Access Control Lists) to control who can access or modify objects in the bucket.  

[![Image](https://github.com/user-attachments/assets/087e989d-4281-45a8-b74b-821fd8673be7)

---

## Bucket Endpoints  

Once static website hosting is enabled, S3 produces a **bucket endpoint URL**, just like a regular website URL. It lets people visit your S3 bucket as a website.  

#### First attempt:  
When I first visited the bucket endpoint URL, I saw an error: **403 Forbidden**.  

#### Why?  
The default settings in S3 keep the account's data secure. This error means the files are private.  

![Image](https://github.com/user-attachments/assets/dfa3b92d-2389-40f1-86a6-e357cdff9b1c)  

---

## Success!  

To resolve the connection error, I had to make the website files publicly accessible so everyone could view the website.  

### Solution:  
In the **Actions** dropdown, I selected **"Make public using ACL"**.  
[Check out it](http://drift-website-v1.s3-website-us-west-1.amazonaws.com/)


![Image](https://github.com/user-attachments/assets/10e7ae98-bf20-40cd-b03f-a783f470b536)

# Additional Feautres 
### Hosting a Website on Amazon S3 with CloudFront
## Overview
This documentation outlines the steps for hosting a static website on Amazon S3 and integrating it with CloudFront for optimized performance and security.

## Amazon S3 Static Website Hosting
### Setup
1. **Create an S3 Bucket(go to the s3 bucket created above)**
   - Enable **Static Website Hosting** in the **Properties** tab.
   - Note the **Bucket Website Endpoint**.

2. **Update Bucket Permissions**
   - Add a **Bucket Policy** to allow public access:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```
## CloudFront Integration
### Setup CloudFront Distribution
1. Create a CloudFront Distribution
- Set Origin Domain Name to your S3 bucket (not the website endpoint).
- Enable Origin Access Control (OAC) for security.
- Allow GET, HEAD, OPTIONS HTTP methods.
- Redirect HTTP to HTTPS.

2. Configure Caching & Custom Domain

- Use Amazon Certificate Manager (ACM) for SSL if using a custom domain.
- Add Alternate Domain Name (CNAME) if applicable.
### Testing
- Retrieve and test the CloudFront URL.
- [Check it out](https://di2xyy7cv62g.cloudfront.net/)
- Ensure accessibility and performance optimizations.
For further configurations I like to add Route 53 custom domains or CloudFront caching settings.










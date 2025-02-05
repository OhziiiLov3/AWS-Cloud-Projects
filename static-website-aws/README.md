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


[![DEMO](https://github.com/user-attachments/assets/74ec811c-2965-4c36-a254-d3cf0df0e264)](https://your-video-link.com)





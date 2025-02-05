# How to Set Up a Zero-Spending Budget on AWS with a Threshold > $0.01

## Step 1: Sign in to AWS Billing Console
1. Go to the [AWS Billing Dashboard](https://console.aws.amazon.com/billing/home).
2. Select **Budgets** from the left-hand menu.

## Step 2: Create a New Budget
1. Click **Create a budget**.
2. Choose **Cost budget** and click **Next**.

## Step 3: Configure Budget Details
1. **Budget Name**: Enter a name (e.g., `Zero-Spending-Budget`).
2. **Period**: Select **Monthly**.
3. **Start Date**: Select the current month.
4. **End Date**: Keep it **Recurring**.
5. **Budgeted Amount**: Enter `$0.00`.

## Step 4: Set Up an Alert Threshold
1. Under **Notifications**, click **Add an alert threshold**.
2. Set **Threshold type** to **Actual Cost**.
3. Enter a **Threshold amount** slightly above zero (e.g., `$0.01`).
4. Enter your email to receive alerts when spending exceeds this amount.
5. Click **Confirm budget**.

## Step 5: Review and Create
1. Double-check the details.
2. Click **Create budget**.

## Step 6: Monitor and Take Action
- If you receive an alert, immediately check your AWS services in the **Billing Dashboard**.
- Consider enabling **IAM policies** to restrict accidental usage.

With this setup, you will be notified as soon as any spending occurs, helping to ensure your AWS costs remain at zero.

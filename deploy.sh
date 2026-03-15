#!/bin/bash
# Deploy AEP KPIs Dashboard to AWS S3 + CloudFront

CLOUDFRONT_ID="E1LUWJRBZ6HOJ"

echo "🔨 Building..."
npm run build

echo "🚀 Uploading to S3..."
aws s3 sync dist/ s3://aep-kpis-dashboard --delete

echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*" > /dev/null

echo ""
echo "✅ Deployed!"
echo "🌐 URL: https://dj0ov5dknez63.cloudfront.net"

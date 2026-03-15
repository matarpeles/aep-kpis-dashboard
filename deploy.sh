#!/bin/bash
# Deploy AEP KPIs Dashboard to AWS S3 + CloudFront

CLOUDFRONT_ID="E1V7T4HA7J8C6Z"

echo "🔨 Building..."
npm run build

echo "🚀 Uploading to S3..."
aws s3 sync dist/ s3://aep-kpis-dashboard --delete

echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*" > /dev/null

echo ""
echo "✅ Deployed!"
echo "🌐 URL: https://d20t44wvt9s5oq.cloudfront.net"

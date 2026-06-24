import { S3 } from '@aws-sdk/client-s3';

const s3Client = new S3({
    region: process.env.AWS_REGION || 'sa-east-1'
});

export const handler = async (event) => {

    const example_var = process.env.EXAMPLE_VAR || 'default_value';

    const record = event.Records[0];
    const Bucket = record.s3.bucket.name;
    const Key = record.s3.object.key;

    const getObjectResult = await s3Client.getObject({ Bucket, Key });
    const megaByte = 1024 * 1024;

    if (getObjectResult.ContentLength > megaByte) {
        let msg = `The file ${Key} is larger than 1MB. Size: ${getObjectResult.ContentLength} bytes.`;
        console.log(msg);
        return msg;
    }

    console.log(`Bucket: ${Bucket}`);
    console.log(`Key: ${Key}`);

    return {
        statusCode: 200,
        body: 'Object processed successfully.',
    };
};

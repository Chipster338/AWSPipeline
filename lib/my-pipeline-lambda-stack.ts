import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';


export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
  
      
      const myFunctionHandler = new lambda.Function(this, 'MyFunction', {
        code: lambda.Code.fromAsset("Resources/test_nodeJS.zip"),
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: 'index.handler',
      });
    }
}
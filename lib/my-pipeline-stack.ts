import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './my-pipeline-app-stage';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('Chipster338/AWSPipeline', 'main', {
          connectionArn: 'arn:aws:codestar-connections:us-east-1:451255536186:connection/69f50375-f9bc-4985-877d-3d5ed4c0bd06'
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
    pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "451255536186", region: "us-east-1" }
    }));

    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, 'testing', {
      env: { account: '451255536186', region: 'us-east-1' }
    }));
    
        testingStage.addPost(new ManualApprovalStep('approval'));

    
  }
}
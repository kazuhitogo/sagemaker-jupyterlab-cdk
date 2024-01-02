import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam'
import * as sagemaker from 'aws-cdk-lib/aws-sagemaker';

interface SagemakerJupyterlabCdkStackProps extends StackProps {
  imageUri: string;
}

export class SagemakerJupyterlabCdkStack extends Stack {
  constructor(scope: Construct, id: string, props: SagemakerJupyterlabCdkStackProps) {
    super(scope, id, props);

    const sagemakerRole = new iam.Role(this, 'Role', {
      assumedBy: new iam.ServicePrincipal('sagemaker.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')
      ],
    })

    const cfnImage = new sagemaker.CfnImage(this, `CfnImage`, {
      imageName : 'sagemaker-jupyterlab-py310',
      imageRoleArn : sagemakerRole.roleArn,
      imageDescription : 'SageMaker JupyterLab で動かす Python3.10 の Container Image',
      imageDisplayName : 'SageMaker-JupyterLab-Py310',
    })

    const cfnImageVersion = new sagemaker.CfnImageVersion(this, 'CfnImageVersion',{
      baseImage: props.imageUri,
      imageName: cfnImage.imageName,
    })
    cfnImageVersion.addDependency(cfnImage)

    new CfnOutput(this, 'imageURI', {
      value: props.imageUri
    })
  }
}

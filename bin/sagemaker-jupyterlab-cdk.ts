#!/usr/bin/env node
import 'source-map-support/register';
import {App, Tags} from 'aws-cdk-lib';
import { SagemakerEcrImage } from '../lib/sagemaker-ecr-image';
import { SagemakerJupyterlabCdkStack } from '../lib/sagemaker-jupyterlab-cdk-stack';

const app = new App();
const sagemakerEcrImage = new SagemakerEcrImage(app, `SageMakerEcrImage`,{});

const sagemakerJupyterlabCdkStack = new SagemakerJupyterlabCdkStack(app, 'SagemakerJupyterlabCdkStack', {
  imageUri: sagemakerEcrImage.imageUri
});
sagemakerJupyterlabCdkStack.addDependency(sagemakerEcrImage);

Tags.of(app).add("stack", "SagemakerJupyterlabCdkStack");
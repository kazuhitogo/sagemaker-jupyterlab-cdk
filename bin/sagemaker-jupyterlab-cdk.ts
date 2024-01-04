#!/usr/bin/env node
import 'source-map-support/register';
import {App, Tags} from 'aws-cdk-lib';
import { SagemakerSelfManagedImage } from '../lib/sagemaker-self-managed-Image';
import { SagemakerJupyterLabCdkStack } from '../lib/sagemaker-jupyterlab-cdk-stack';

const app = new App();

const repositoryName: string = app.node.tryGetContext('repositoryName');
const versionTag: string = app.node.tryGetContext('versionTag');
const domainId: string = app.node.tryGetContext('domainId');
const imageName: string = app.node.tryGetContext('imageName');

const sagemakerSelfManagedImage = new SagemakerSelfManagedImage(app, `SagemakerSelfManagedImage`,{
  repositoryName: repositoryName,
  versionTag: versionTag
});

const sagemakerJupyterLabCdkStack = new SagemakerJupyterLabCdkStack(app, 'SagemakerJupyterLabCdkStack', {
  imageUri: sagemakerSelfManagedImage.imageUri,
  domainId: domainId,
  imageName: imageName
});
sagemakerJupyterLabCdkStack.addDependency(sagemakerSelfManagedImage);

Tags.of(app).add("stack", "SagemakerJupyterLabCdkStack");
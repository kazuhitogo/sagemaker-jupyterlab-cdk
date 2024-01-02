import {Stack, StackProps, RemovalPolicy} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import { DockerImageDeployment, Source, Destination} from 'cdk-docker-image-deployment';
import * as path from 'path'
import {ContainerImage} from 'aws-cdk-lib/aws-ecs';

const versionTag:string = 'v1';

export class SagemakerEcrImage extends Stack {
    public readonly imageUri: string;
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const repo = new Repository(this, `Repository`, {
            repositoryName : "sagemaker-jupyterlab-py310",
            removalPolicy: RemovalPolicy.DESTROY
        });

        new DockerImageDeployment(this, 'DockerImageDeployment', {
            source: Source.directory(
            path.resolve(__dirname, "..", "container")
            ),
            destination: Destination.ecr(repo, {
            tag: versionTag
            }),
        });
        this.imageUri = ContainerImage.fromEcrRepository(repo, versionTag).imageName;
    }
}

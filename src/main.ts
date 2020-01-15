import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const options = new DocumentBuilder()
        .setTitle('Impuls-API')
        .setDescription('Open Source api for all things Impuls. (https://github.com/kodekameratene/impuls-api)')
        .setVersion('1.0')
        .addTag('impuls')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}

bootstrap();

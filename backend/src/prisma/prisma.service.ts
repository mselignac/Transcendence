import { Injectable } from 'node_modules/@nestjs/common';
import { ConfigService } from 'node_modules/@nestjs/config';
import { PrismaClient } from 'node_modules/@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
	constructor (config: ConfigService) {
		super({
			datasources: {
				db: {
					url: config.get('DATABASE_URL'),
				},
			},
		});
	}

	cleanDb() {
		return this.$transaction([
			// this.bookmark.deleteMany(),
			this.user.deleteMany(),
		]);
	}
}

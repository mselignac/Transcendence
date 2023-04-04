import { Injectable } from 'aaaaa/@nestjs/common';
import { ConfigService } from 'aaaaa/@nestjs/config';
import { PrismaClient } from 'aaaaa/@prisma/client';

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

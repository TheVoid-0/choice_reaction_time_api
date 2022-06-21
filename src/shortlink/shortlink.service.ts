import { PrismaService } from 'src/database/prisma.service';

import HashidsType from 'hashids';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Hashids: new (...args: any[]) => HashidsType = require('hashids');
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ShortlinkService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(url: string) {
    const totalShortlink = await this.prismaService.shortlink.count();

    const shortId = new Hashids(process.env.HASH_ID_SALT).encode(totalShortlink);

    const { id } = await this.prismaService.shortlink.create({
      data: { shortId, url },
    });

    return {
      id,
      shortlink: `${process.env.URL_API_SHORTLINK}/${shortId}`,
    };
  }

  async get(shortId: string) {
    try {
      const { url } = await this.prismaService.shortlink.findUnique({
        where: { shortId },
        rejectOnNotFound: true,
      });

      return url;
    } catch (error) {
      throw new NotFoundException(`Url for shortId ${shortId} not found`);
    }
  }
}

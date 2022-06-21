import { BadRequestException, Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ShortlinkService } from './shortlink.service';

@Controller('shortlinks')
export class ShorlinkController {
  constructor(private readonly shortlinkService: ShortlinkService) {}

  @Post()
  async create(@Body('url') url: string) {
    if (typeof url !== 'string') throw new BadRequestException(`${url} is not a string`);
    return this.shortlinkService.create(url);
  }

  @Get(':shortId')
  async get(@Param('shortId') shortId: string, @Res({ passthrough: true }) res: Response) {
    const url = await this.shortlinkService.get(shortId);

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return res.redirect(`https://${url}`);
    }

    return res.redirect(await this.shortlinkService.get(shortId));
  }
}

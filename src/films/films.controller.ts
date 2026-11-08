import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  // GET /films  |  /films?ditonton=true  |  /films?ditonton=false
  @Get()
  tampilkanSemua(@Query('ditonton') ditonton?: string) {
    let filter: boolean | undefined;
    if (ditonton === 'true') filter = true;
    else if (ditonton === 'false') filter = false;
    return this.filmsService.semua(filter);
  }

  // GET /films/:id  -> 404 kalau tidak ketemu
  @Get(':id')
  tampilkanDetail(@Param('id') id: string) {
    return this.filmsService.cari(id);
  }

  // POST /films  -> 201 Created (validasi lewat DTO + ValidationPipe)
  @Post()
  tambah(@Body() dto: CreateFilmDto) {
    return this.filmsService.simpan(dto);
  }

  // PATCH /films/:id  -> ubah sebagian field (mis. sudahDitonton)
  @Patch(':id')
  ubah(@Param('id') id: string, @Body() dto: UpdateFilmDto) {
    return this.filmsService.ubah(id, dto);
  }

  // DELETE /films/:id
  @Delete(':id')
  hapus(@Param('id') id: string) {
    const film = this.filmsService.hapus(id);
    return { pesan: 'Film berhasil dihapus', film };
  }
}

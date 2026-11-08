import { Injectable, NotFoundException } from '@nestjs/common';
import filmsData from '../films.json';
import { Film } from './film.interface';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class FilmsService {
  // Data disimpan in-memory (array), hilang kalau server di-restart
  private films: Film[] = filmsData as Film[];

  constructor() {
    // Tahap 2: tampilkan isi data ke log terminal
    console.log('Data films.json berhasil dimuat:', this.films);
  }

  semua(ditonton?: boolean): Film[] {
    if (ditonton === undefined) return this.films;
    return this.films.filter((f) => f.sudahDitonton === ditonton);
  }

  cari(id: string): Film {
    const film = this.films.find((f) => f.id === id);
    if (!film) {
      throw new NotFoundException(`Film dengan id ${id} tidak ditemukan`);
    }
    return film;
  }

  simpan(dto: CreateFilmDto): Film {
    // ID unik: ambil id terbesar lalu +1 (aman walau ada film yang dihapus)
    const idTerbesar = this.films.reduce((max, f) => Math.max(max, Number(f.id)), 0);
    const filmBaru: Film = {
      id: String(idTerbesar + 1),
      judul: dto.judul,
      genre: dto.genre,
      tahun: dto.tahun,
      rating: dto.rating,
      sudahDitonton: dto.sudahDitonton ?? false,
    };
    this.films.push(filmBaru);
    return filmBaru;
  }

  ubah(id: string, dto: UpdateFilmDto): Film {
    const film = this.cari(id); // otomatis 404 kalau tidak ada
    Object.assign(film, dto);
    return film;
  }

  hapus(id: string): Film {
    const film = this.cari(id);
    this.films = this.films.filter((f) => f.id !== id);
    return film;
  }
}

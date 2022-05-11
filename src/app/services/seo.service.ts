import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  updateTitle(pageTitle: string) {
    this.title.setTitle(pageTitle);
  }

  updateMeta(name: string, content: string) {
    this.meta.updateTag({ name, content });
  }
}

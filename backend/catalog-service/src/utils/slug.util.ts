import slugify from 'slugify';

export function toSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true, // loại bỏ ký tự đặc biệt
    trim: true
  });
}

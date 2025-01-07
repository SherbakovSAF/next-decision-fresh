import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Такой страницы нет</h2>
      <Link href="/">Вернутся на главную</Link>
    </div>
  );
}

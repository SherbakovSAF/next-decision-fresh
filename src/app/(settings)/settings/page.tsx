const SettingsPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl">Раздел в разработке</h1>
      <p>Что Вы сможете тут изменить?</p>
      <small>Если я не заброшу проект</small>
      <ul className="list-disc ml-4">
        <li> Поменять язык</li>
        <li>Подтвердить почту</li>
        <li>Поменять пароль</li>
        <li>Привязать соц сети(Пока что телеграмм для оповещений)</li>
        <li>
          Закинуть мне денег.{" "}
          <small>
            Не потому что я меркантильный, а потому что надо протестить
            подключение оплаты
          </small>
        </li>
      </ul>
    </div>
  );
};

export default SettingsPage;

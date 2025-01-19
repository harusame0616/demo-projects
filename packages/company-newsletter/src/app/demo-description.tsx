export function DemoDescription() {
  return (
    <section aria-labelledby="demo-description-text" className="text-sm">
      <h2 id="demo-description-text" className="mb-4 text-lg font-bold">
        社内報デシステム
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 text-base font-bold">本システムについて</h3>
          <div className="flex flex-col">
            本システムは架空の仕様を想定した社内報のデモシステムです。
            ご自由にお試しいただけますが、誰でも閲覧・操作できるため実在するデータを入力するのはご遠慮ください。
            また、データは適時リセットされますので、ご了承ください。
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-base font-bold">メールアドレス</h3>
          <dl className="space-y-4">
            <div>
              <dt>Admin ロール+投稿可（管理画面と管理機能が利用可能）</dt>
              <dt className="rounded-md bg-muted p-2">admin@example.com</dt>
            </div>
            <div>
              <dt>一般ロール＋投稿可（記事の閲覧と投稿が可能）</dt>
              <dd className="rounded-md bg-muted p-2">post@example.com</dd>
            </div>
            <div>
              <dt>一般ロール（記事の閲覧のみ）</dt>
              <dt className="rounded-md bg-muted p-2">general@example.com</dt>
            </div>
          </dl>
        </div>
        <div>
          <h3 className="mb-2 text-base font-bold">パスワード</h3>
          <dl className="space-y-4">
            <div>
              <dt>全共通パスワード</dt>
              <dt className="rounded-md bg-muted p-2">password</dt>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

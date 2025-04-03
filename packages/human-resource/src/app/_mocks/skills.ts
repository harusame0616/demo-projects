export type SkillCategory = {
	id: string;
	name:
		| "プログラミング言語"
		| "フレームワーク"
		| "インフラ"
		| "データベース"
		| "ツール";
};

export const skillCategories: SkillCategory[] = [
	{ id: "CAT_001", name: "プログラミング言語" },
	{ id: "CAT_002", name: "フレームワーク" },
	{ id: "CAT_003", name: "インフラ" },
	{ id: "CAT_004", name: "データベース" },
	{ id: "CAT_005", name: "ツール" },
];

export type Skill = {
	code: string;
	name: string;
	description: string;
	level: number;
	requirements: string;
	category:
		| "プログラミング言語"
		| "フレームワーク"
		| "インフラ"
		| "データベース"
		| "ツール";
	categoryId: string;
};

export const skills: Skill[] = [
	{
		code: "SKILL_001",
		name: "JavaScript",
		description:
			"モダンなWebアプリケーション開発に不可欠なプログラミング言語。フロントエンド開発の基礎となる技術です。",
		level: 3,
		requirements:
			"ES6以降の機能を理解し、非同期処理やモジュール化された開発ができること。TypeScriptへの移行経験があることが望ましい。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_002",
		name: "TypeScript",
		description:
			"静的型付けによって、より安全なJavaScriptコードを書くことができる言語。大規模アプリケーション開発に適しています。",
		level: 4,
		requirements:
			"型システムを理解し、インターフェースやジェネリクスを活用した堅牢なコード設計ができること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_003",
		name: "React",
		description:
			"Facebookが開発したUIライブラリ。コンポーネントベースの開発とステート管理が特徴です。",
		level: 4,
		requirements:
			"フックスやコンテキストを理解し、パフォーマンスを考慮したコンポーネント設計ができること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_004",
		name: "Next.js",
		description:
			"Reactベースのフルスタックフレームワーク。SSRやSSGなど、最新のWeb開発手法をサポートしています。",
		level: 3,
		requirements:
			"App RouterやServer Componentsなど、Next.js 13以降の新機能を理解し、適切なルーティング設計ができること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_005",
		name: "Python",
		description:
			"読みやすい文法と豊富なライブラリを持つ汎用プログラミング言語。データ分析やバックエンド開発に広く使用されています。",
		level: 3,
		requirements:
			"オブジェクト指向プログラミングを理解し、Djangoなどのフレームワークを使用した開発経験があること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_006",
		name: "AWS",
		description:
			"Amazonが提供するクラウドプラットフォーム。様々なクラウドサービスを組み合わせたシステム構築が可能です。",
		level: 4,
		requirements:
			"EC2、S3、RDS、Lambdaなどの主要サービスを理解し、セキュアなインフラ設計ができること。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_007",
		name: "Docker",
		description:
			"コンテナ化技術を使用して、アプリケーションの開発・デプロイを効率化するプラットフォーム。",
		level: 3,
		requirements:
			"Dockerfileの作成やコンテナのオーケストレーションができること。マルチステージビルドの経験があることが望ましい。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_008",
		name: "PostgreSQL",
		description:
			"高度な機能を持つオープンソースのリレーショナルデータベース。地理空間データの処理なども得意としています。",
		level: 4,
		requirements:
			"パフォーマンスチューニングやバックアップ/リストア、レプリケーションの設定ができること。",
		category: "データベース",
		categoryId: "CAT_004",
	},
	{
		code: "SKILL_009",
		name: "Git",
		description:
			"分散型バージョン管理システム。チーム開発に不可欠なツールです。",
		level: 4,
		requirements:
			"ブランチ戦略を理解し、コンフリクト解決やリベースなどの高度な操作ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_010",
		name: "Kubernetes",
		description:
			"コンテナオーケストレーションプラットフォーム。大規模なコンテナ環境の管理を自動化します。",
		level: 3,
		requirements:
			"ポッドやサービスの概念を理解し、基本的なマニフェストファイルの作成ができること。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_011",
		name: "Node.js",
		description:
			"サーバーサイドJavaScriptの実行環境。スケーラブルなネットワークアプリケーションを構築できます。",
		level: 4,
		requirements:
			"非同期処理の概念を理解し、Express.jsなどのフレームワークを使用したAPI開発ができること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_012",
		name: "Vue.js",
		description:
			"プログレッシブなJavaScriptフレームワーク。シンプルなAPI設計と優れたパフォーマンスが特徴です。",
		level: 3,
		requirements:
			"コンポジションAPIとOptionsAPIの違いを理解し、Vuexを使用した状態管理ができること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_013",
		name: "GraphQL",
		description:
			"APIのためのクエリ言語。クライアントが必要なデータを正確に指定できるため、オーバーフェッチングを防ぎます。",
		level: 3,
		requirements:
			"スキーマ設計やリゾルバの実装ができ、Apollo ServerとClientを活用した開発経験があること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_014",
		name: "MongoDB",
		description:
			"ドキュメント指向のNoSQLデータベース。スケーラビリティと柔軟性に優れています。",
		level: 3,
		requirements:
			"適切なインデックス設計やアグリゲーションパイプラインの構築ができること。MongooseなどのODMの使用経験があること。",
		category: "データベース",
		categoryId: "CAT_004",
	},
	{
		code: "SKILL_015",
		name: "React Native",
		description:
			"Reactを使用したクロスプラットフォームモバイルアプリ開発フレームワーク。",
		level: 4,
		requirements:
			"ネイティブコンポーネントとの連携や、パフォーマンス最適化の手法を理解していること。Expoの使用経験があると望ましい。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_016",
		name: "Terraform",
		description:
			"インフラストラクチャをコードとして管理するためのツール。クラウドリソースのプロビジョニングを自動化します。",
		level: 3,
		requirements:
			"HCLの文法を理解し、モジュール化されたインフラ構成を設計・実装できること。リモートステート管理の経験があると望ましい。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_017",
		name: "Go",
		description:
			"Googleが開発した静的型付け言語。シンプルな文法と高いパフォーマンスが特徴です。",
		level: 4,
		requirements:
			"並行処理の概念を理解し、goroutineとchannelを活用した効率的なプログラムを書けること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_018",
		name: "Redis",
		description:
			"インメモリデータストア。高速なデータアクセスとキャッシュ機能を提供します。",
		level: 3,
		requirements:
			"データ構造（文字列、ハッシュ、リスト等）の特性を理解し、適切なユースケースに応じた設計ができること。",
		category: "データベース",
		categoryId: "CAT_004",
	},
	{
		code: "SKILL_019",
		name: "Angular",
		description:
			"Googleが開発したフロントエンドフレームワーク。フルスタックの機能を備えています。",
		level: 4,
		requirements:
			"RxJSを活用した非同期処理やNgRxを使用した状態管理ができること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_020",
		name: "Rust",
		description:
			"高パフォーマンスでメモリ安全性を重視した言語。システムプログラミングに適しています。",
		level: 5,
		requirements:
			"所有権モデルと借用の概念を理解し、安全な並行処理プログラムを書けること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_021",
		name: "Jenkins",
		description:
			"オープンソースのCI/CDツール。ビルド、テスト、デプロイを自動化します。",
		level: 3,
		requirements:
			"Jenkinsfileを使用したパイプライン構築やプラグインの設定ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_022",
		name: "Elasticsearch",
		description:
			"分散型の検索・分析エンジン。大量のデータからリアルタイムで検索と分析が可能です。",
		level: 4,
		requirements:
			"適切なインデックス設計や複雑なクエリ、アグリゲーションの実装ができること。",
		category: "データベース",
		categoryId: "CAT_004",
	},
	{
		code: "SKILL_023",
		name: "Swift",
		description:
			"Appleが開発したiOSアプリケーション開発言語。安全性と表現力を重視しています。",
		level: 4,
		requirements:
			"SwiftUIとUIKitの両方を理解し、アプリのライフサイクルや非同期処理を適切に扱えること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_024",
		name: "Ansible",
		description:
			"シンプルなYAML構文を使用した構成管理ツール。サーバー設定の自動化に適しています。",
		level: 3,
		requirements:
			"プレイブックとロールの構造を理解し、べき等性を考慮した設定ファイルを作成できること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_025",
		name: "Django",
		description:
			"Pythonベースの高水準Webフレームワーク。セキュリティと拡張性に優れています。",
		level: 4,
		requirements:
			"MVTアーキテクチャを理解し、認証・権限管理やORMを効果的に活用できること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_026",
		name: "Flutter",
		description:
			"Googleが開発したクロスプラットフォームUIフレームワーク。単一のコードベースからネイティブアプリを構築できます。",
		level: 4,
		requirements:
			"Widgetツリーの概念を理解し、Providerなどを使用した状態管理ができること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_027",
		name: "Kotlin",
		description:
			"JVMで動作する静的型付け言語。Java互換性を持ちながら、より簡潔な文法を提供します。",
		level: 3,
		requirements:
			"コルーチンや拡張関数などの特徴的な機能を理解し、Androidアプリ開発の経験があること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_028",
		name: "Spring Boot",
		description:
			"Javaベースのアプリケーション開発フレームワーク。エンタープライズアプリケーションの構築に適しています。",
		level: 4,
		requirements:
			"DIコンテナやAOPの原理を理解し、RESTful APIやマイクロサービスの設計ができること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_029",
		name: "Cassandra",
		description:
			"スケーラブルで高可用性のNoSQLデータベース。大規模分散システムに適しています。",
		level: 4,
		requirements:
			"データモデリングの原則を理解し、パーティショニングや複製の設計ができること。",
		category: "データベース",
		categoryId: "CAT_004",
	},
	{
		code: "SKILL_030",
		name: "Google Cloud Platform",
		description:
			"Googleが提供するクラウドコンピューティングサービス。AIやビッグデータ処理に強みがあります。",
		level: 3,
		requirements:
			"GCEやGKE、CloudRunなどの主要サービスを使いこなし、適切なアーキテクチャ設計ができること。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_031",
		name: "Ruby",
		description:
			"シンプルで読みやすい文法を持つオブジェクト指向言語。Web開発で広く使用されています。",
		level: 3,
		requirements:
			"メタプログラミングやブロックの概念を理解し、Ruby on Railsでの開発経験があること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_032",
		name: "PHP",
		description:
			"Webアプリケーション開発に特化したスクリプト言語。多くのCMSやeコマースプラットフォームの基盤となっています。",
		level: 3,
		requirements:
			"PSR標準に準拠したコーディングができ、Laravelなどのフレームワークを使いこなせること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_033",
		name: "C#",
		description:
			"Microsoftが開発した汎用プログラミング言語。.NETフレームワークと共に使用されます。",
		level: 4,
		requirements:
			"LINQ や非同期プログラミングの概念を理解し、ASP.NET Coreでのアプリケーション開発経験があること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_034",
		name: "Prometheus",
		description:
			"オープンソースのモニタリングシステム。メトリクスの収集と警告機能を提供します。",
		level: 3,
		requirements:
			"PromQLを使用したクエリの作成や、効果的なアラートルールの設定ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_035",
		name: "Azure",
		description:
			"Microsoftのクラウドコンピューティングプラットフォーム。エンタープライズ向けサービスが充実しています。",
		level: 3,
		requirements:
			"Azure App Service や Azure Functions などのPaaSサービスの設定と運用ができること。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_036",
		name: "Ruby on Rails",
		description:
			"Ruby用のWebアプリケーションフレームワーク。規約優先の設計思想を持っています。",
		level: 4,
		requirements:
			"MVC パターンを理解し、ActiveRecordを使った効果的なデータベース操作ができること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_037",
		name: "Gatsby",
		description:
			"Reactベースの静的サイトジェネレーター。高速なWebサイト構築に適しています。",
		level: 3,
		requirements:
			"GraphQLを使用したデータソースの活用と、プラグインエコシステムを理解していること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_038",
		name: "SQL Server",
		description:
			"Microsoftのリレーショナルデータベース管理システム。エンタープライズ環境での利用に適しています。",
		level: 4,
		requirements:
			"T-SQLの高度な機能を理解し、ストアドプロシージャやトリガーの適切な設計ができること。",
		category: "データベース",
		categoryId: "CAT_004",
	},
	{
		code: "SKILL_039",
		name: "Svelte",
		description:
			"コンパイル時にリアクティブな更新を実現するJavaScriptフレームワーク。軽量で高速な実行が特徴です。",
		level: 3,
		requirements:
			"リアクティブな状態管理とコンポーネントライフサイクルを理解し、SvelteKitでのアプリケーション開発経験があること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_040",
		name: "Scala",
		description:
			"オブジェクト指向と関数型プログラミングの特徴を兼ね備えた言語。JVM上で動作します。",
		level: 4,
		requirements:
			"関数型プログラミングのパラダイムを理解し、Akkaなどのフレームワークを活用した開発経験があること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_041",
		name: "Laravel",
		description:
			"PHP用のWebアプリケーションフレームワーク。エレガントな文法と豊富な機能を提供します。",
		level: 3,
		requirements:
			"Eloquent ORMやBladeテンプレートエンジンを理解し、アーティザンコマンドを活用した開発ができること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_042",
		name: "GraphQL",
		description:
			"APIのためのクエリ言語とランタイム。必要なデータを正確に指定できるため、効率的なデータ取得が可能です。",
		level: 4,
		requirements:
			"スキーマ設計とリゾルバの実装ができ、Apollo Server/Clientを活用した開発経験があること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_043",
		name: "Oracle Database",
		description:
			"エンタープライズ向けリレーショナルデータベース管理システム。スケーラビリティと信頼性に優れています。",
		level: 5,
		requirements:
			"PL/SQLやパフォーマンスチューニング、RAC構成などの高度な機能を理解していること。",
		category: "データベース",
		categoryId: "CAT_004",
	},
	{
		code: "SKILL_044",
		name: "ASP.NET Core",
		description:
			"クロスプラットフォームで高性能なフレームワーク。Windowsだけでなく、Linux、macOSでも動作します。",
		level: 4,
		requirements:
			"Dependency Injectionやミドルウェアの概念を理解し、RESTful APIやMVCアプリケーションの開発経験があること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_045",
		name: "Firebase",
		description:
			"Googleのモバイルアプリケーション開発プラットフォーム。バックエンドサービスを簡単に統合できます。",
		level: 3,
		requirements:
			"Firestoreや認証、Cloud Functions、ホスティングなどの主要サービスを活用できること。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_046",
		name: "Sass/SCSS",
		description:
			"CSSを拡張したスタイルシート言語。変数や入れ子、ミックスインなどの機能を提供します。",
		level: 3,
		requirements:
			"変数、ミックスイン、関数などの機能を理解し、保守性の高いスタイルシートを作成できること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_047",
		name: "Nginx",
		description:
			"高性能なWebサーバー、リバースプロキシ、ロードバランサー。低メモリ消費と高並行性が特徴です。",
		level: 3,
		requirements:
			"リバースプロキシやロードバランシングの設定ができ、キャッシュや圧縮などの最適化ができること。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_048",
		name: "Webpack",
		description:
			"モジュールバンドラー。アセットの変換、バンドル、最適化を行います。",
		level: 3,
		requirements:
			"設定ファイルのカスタマイズやローダーとプラグインの活用ができ、効率的なビルドパイプラインを構築できること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_049",
		name: "Express.js",
		description: "Node.js用の最小限で柔軟なWebアプリケーションフレームワーク。",
		level: 3,
		requirements:
			"ミドルウェアの概念を理解し、RESTful APIやMVCアプリケーションの構築ができること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_050",
		name: "Haskell",
		description:
			"純粋関数型プログラミング言語。強力な型システムと高い抽象化能力が特徴です。",
		level: 5,
		requirements:
			"モナドや高階関数、型クラスなどの概念を理解し、実用的なアプリケーションを開発できること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_051",
		name: "Supabase",
		description:
			"オープンソースのFirebase代替サービス。PostgreSQLをベースにしたBaaSプラットフォームです。",
		level: 3,
		requirements:
			"認証、リアルタイムサブスクリプション、ストレージなどの機能を理解し、フロントエンドと統合できること。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_052",
		name: "DynamoDB",
		description:
			"AWSが提供するNoSQLデータベースサービス。スケーラビリティと低レイテンシーが特徴です。",
		level: 4,
		requirements:
			"パーティションキーとソートキーの設計や、単一テーブル設計のパターンを理解していること。",
		category: "データベース",
		categoryId: "CAT_004",
	},
	{
		code: "SKILL_053",
		name: "Tailwind CSS",
		description:
			"ユーティリティファーストのCSSフレームワーク。カスタマイズ性が高く、迅速なUIの構築が可能です。",
		level: 3,
		requirements:
			"ユーティリティクラスの体系を理解し、レスポンシブデザインやダークモードなどの機能を活用できること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_054",
		name: "Elixir",
		description:
			"Erlang VM上で実行される関数型プログラミング言語。並行処理と耐障害性に優れています。",
		level: 4,
		requirements:
			"パターンマッチングやプロセスの概念を理解し、Phoenixフレームワークを使用した開発経験があること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_055",
		name: "JUnit",
		description:
			"Java用の単体テストフレームワーク。テスト駆動開発をサポートします。",
		level: 3,
		requirements:
			"テストライフサイクルやアサーションを理解し、モックやスタブを活用したテストが書けること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_056",
		name: "Jest",
		description:
			"JavaScriptアプリケーション用のテストフレームワーク。React向けに設計されていますが、他のフレームワークでも使用できます。",
		level: 3,
		requirements:
			"モックやスナップショットテストを活用でき、コンポーネントのテストが書けること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_057",
		name: "Apache Kafka",
		description:
			"分散イベントストリーミングプラットフォーム。高スループットと耐障害性を備えています。",
		level: 4,
		requirements:
			"トピックとパーティション、コンシューマーグループの概念を理解し、適切なメッセージング設計ができること。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_058",
		name: "Cypress",
		description:
			"JavaScriptベースのE2Eテストフレームワーク。モダンなWebアプリケーションのテストに最適です。",
		level: 3,
		requirements:
			"セレクタの使用法やアサーション、カスタムコマンドの作成ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_059",
		name: "Vercel",
		description:
			"フロントエンドフレームワーク向けのデプロイプラットフォーム。CI/CDとエッジネットワークを提供します。",
		level: 3,
		requirements:
			"環境変数の設定やカスタムドメインの設定、Serverless Functionsの利用経験があること。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_060",
		name: "RabbitMQ",
		description:
			"オープンソースのメッセージブローカー。AMQPプロトコルを実装しています。",
		level: 3,
		requirements:
			"キューとエクスチェンジの概念を理解し、メッセージの耐久性やAck確認の設定ができること。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_061",
		name: "Nuxt.js",
		description:
			"Vue.jsベースのフルスタックフレームワーク。SSRやSSGをサポートしています。",
		level: 3,
		requirements:
			"ディレクトリ構造や各種モジュールを理解し、効率的なアプリケーション開発ができること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_062",
		name: "Selenium",
		description:
			"Webアプリケーションの自動化テストツール。複数のブラウザやプラットフォームをサポートしています。",
		level: 3,
		requirements:
			"WebDriverの使用法やPageObjectパターンを理解し、安定したテストスイートを構築できること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_063",
		name: "Gradle",
		description: "ビルド自動化ツール。柔軟性と拡張性に優れています。",
		level: 3,
		requirements:
			"ビルドスクリプトの作成やマルチプロジェクト構成、カスタムタスクの実装ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_064",
		name: "Heroku",
		description:
			"クラウドアプリケーションプラットフォーム。シンプルなデプロイとスケーリングが特徴です。",
		level: 3,
		requirements:
			"Procfileの設定やアドオンの活用、パイプラインの構築ができること。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_065",
		name: "NestJS",
		description:
			"Node.js用のサーバーサイドフレームワーク。Angular風の構造を持ち、TypeScriptと相性が良いです。",
		level: 4,
		requirements:
			"モジュール、プロバイダー、コントローラーの概念を理解し、DIを活用した拡張性の高いアプリケーションが構築できること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_066",
		name: "Ember.js",
		description:
			"野心的なWebアプリケーション向けのJavaScriptフレームワーク。規約優先のアプローチを採用しています。",
		level: 4,
		requirements:
			"Emberのオブジェクトモデルやルーティング、テンプレートエンジンを理解し、アドオンを活用できること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_067",
		name: "Apache Spark",
		description:
			"大規模データ処理のための統合分析エンジン。バッチ処理やストリーム処理、機械学習をサポートしています。",
		level: 4,
		requirements:
			"RDDとDataFrameの違いを理解し、Sparkアプリケーションの最適化ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_068",
		name: "CentOS",
		description:
			"エンタープライズ向けのLinuxディストリビューション。安定性と長期サポートが特徴です。",
		level: 3,
		requirements:
			"yumパッケージマネージャーやSystemdの理解、セキュリティ設定ができること。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_069",
		name: "Perl",
		description: "汎用的なプログラミング言語。テキスト処理に強みを持ちます。",
		level: 3,
		requirements:
			"正規表現を活用したテキスト処理やCPANモジュールの活用ができること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_070",
		name: "Splunk",
		description:
			"ログと機械データの分析プラットフォーム。リアルタイムで大量のデータを検索・分析できます。",
		level: 4,
		requirements:
			"検索言語(SPL)を理解し、ダッシュボードやアラートの設定ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_071",
		name: "Solidity",
		description: "Ethereumブロックチェーン上のスマートコントラクト開発言語。",
		level: 5,
		requirements:
			"スマートコントラクトのセキュリティパターンやガス最適化の手法を理解していること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_072",
		name: "Apache Airflow",
		description:
			"プログラムでワークフローを作成、スケジュール、モニタリングするプラットフォーム。",
		level: 4,
		requirements:
			"DAGの設計やオペレーターの使用法、センサーとフックの活用ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_073",
		name: "Nx",
		description:
			"モノレポのための開発ツール。高度なビルド最適化と依存関係管理を提供します。",
		level: 3,
		requirements:
			"ワークスペースの設定や影響を受けたプロジェクトのビルド戦略を理解していること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_074",
		name: "WebSocket",
		description: "クライアントとサーバー間の双方向通信を実現するプロトコル。",
		level: 3,
		requirements:
			"ハンドシェイクの仕組みを理解し、Socket.IOなどのライブラリを使用した実装経験があること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_075",
		name: "MySQL",
		description:
			"世界で最も広く使用されているオープンソースのリレーショナルデータベース。",
		level: 3,
		requirements:
			"正規化やインデックス設計、クエリ最適化の手法を理解していること。",
		category: "データベース",
		categoryId: "CAT_004",
	},
	{
		code: "SKILL_076",
		name: "Unity",
		description: "クロスプラットフォームのゲーム開発エンジン。",
		level: 4,
		requirements:
			"コンポーネントベースのアーキテクチャを理解し、3Dモデリングと物理エンジンの活用ができること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_077",
		name: "gRPC",
		description:
			"高性能なRPCフレームワーク。Protocol Buffersを使用したデータシリアライゼーションを行います。",
		level: 4,
		requirements:
			".protoファイルの設計やサービス定義、ストリーミングAPIの実装ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_078",
		name: "Apache Hadoop",
		description:
			"分散ストレージと分散処理を提供するフレームワーク。ビッグデータ処理に適しています。",
		level: 4,
		requirements:
			"HDFSとMapReduceの概念を理解し、Hadoopエコシステム（Hive、HBaseなど）を活用できること。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_079",
		name: "Vite",
		description:
			"モダンなWebアプリケーション開発のためのビルドツール。高速な開発サーバーを提供します。",
		level: 3,
		requirements:
			"設定ファイルのカスタマイズやプラグインの活用、ESモジュールに基づく開発ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_080",
		name: "R",
		description:
			"統計計算と図示に特化したプログラミング言語。データ分析に広く使用されています。",
		level: 4,
		requirements:
			"データ変換、統計分析、可視化のライブラリを活用でき、Rmarkdownでレポート作成ができること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_081",
		name: "Kibana",
		description:
			"Elasticsearchのデータを視覚化するためのダッシュボードツール。",
		level: 3,
		requirements:
			"ダッシュボードやビジュアライゼーションの作成、高度なクエリの実行ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_082",
		name: "Bash",
		description:
			"UNIXシェル、コマンドラインインタープリタ。スクリプト作成とシステム管理に使用されます。",
		level: 3,
		requirements:
			"シェルスクリプトの作成、正規表現を用いたテキスト処理、プロセス管理ができること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_083",
		name: "Remix",
		description:
			"Reactベースのフルスタックフレームワーク。高速でダイナミックなWebアプリケーションを構築できます。",
		level: 4,
		requirements:
			"ネストされたルーティングやローダー、アクションの概念を理解し、適切なデータフローを設計できること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_084",
		name: "Apache Maven",
		description: "Javaプロジェクトの依存関係管理とビルド自動化ツール。",
		level: 3,
		requirements:
			"POMファイルの設定や依存関係管理、プラグイン設定ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_085",
		name: "Stripe",
		description: "オンライン決済処理のための決済プラットフォーム。",
		level: 3,
		requirements:
			"APIを使用した決済フローの実装や、Webhookとイベントハンドリングができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_086",
		name: "Julia",
		description: "高性能な科学技術計算向けプログラミング言語。",
		level: 4,
		requirements:
			"多重ディスパッチや並列計算の概念を理解し、科学計算やデータ分析の実装ができること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_087",
		name: "Gulp",
		description:
			"JavaScriptのタスクランナー。ファイル操作や変換を自動化します。",
		level: 3,
		requirements:
			"タスクの作成やパイプラインの構築、プラグインの活用ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_088",
		name: "Neo4j",
		description:
			"グラフデータベース管理システム。関連性の高いデータの格納と検索に適しています。",
		level: 4,
		requirements:
			"Cypherクエリ言語を理解し、適切なグラフモデルの設計ができること。",
		category: "データベース",
		categoryId: "CAT_004",
	},
	{
		code: "SKILL_089",
		name: "D3.js",
		description:
			"データ駆動型ドキュメントのためのJavaScriptライブラリ。強力なデータ可視化を実現します。",
		level: 4,
		requirements:
			"SVGの操作やスケール、トランジション、データバインディングの概念を理解していること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_090",
		name: "Apache Tomcat",
		description: "JavaサーブレットとJSPを実装するためのWebコンテナ。",
		level: 3,
		requirements:
			"サーバー設定やデプロイメント、セキュリティ設定ができること。",
		category: "インフラ",
		categoryId: "CAT_003",
	},
	{
		code: "SKILL_091",
		name: "PowerShell",
		description:
			"Windowsタスク自動化とシステム管理のためのスクリプト言語およびシェル。",
		level: 3,
		requirements:
			"パイプラインとオブジェクト指向の概念を理解し、Windowsシステム管理タスクを自動化できること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_092",
		name: "Apache Flink",
		description:
			"分散ストリーム処理フレームワーク。ステートフルな計算に優れています。",
		level: 4,
		requirements:
			"イベント時間とウォーターマークの概念を理解し、ステートフルなオペレーションの実装ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_093",
		name: "TensorFlow",
		description:
			"機械学習とニューラルネットワークのためのオープンソースライブラリ。",
		level: 5,
		requirements:
			"深層学習モデルの設計と訓練、モデルの最適化と展開ができること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_094",
		name: "Clojure",
		description:
			"JVM上で動作する関数型Lispのダイアレクト。データの不変性を重視しています。",
		level: 4,
		requirements:
			"関数型プログラミングのパラダイムとマクロシステムを理解し、リアクティブシステムの構築ができること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_095",
		name: "Puppet",
		description: "インフラストラクチャの自動化と構成管理のためのツール。",
		level: 3,
		requirements:
			"マニフェストの作成やモジュール開発、Puppetサーバーの管理ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_096",
		name: "CouchDB",
		description:
			"JSON形式のドキュメントを格納するドキュメント指向データベース。レプリケーションに優れています。",
		level: 3,
		requirements:
			"ドキュメント設計とビュー、レプリケーションとクラスター構成ができること。",
		category: "データベース",
		categoryId: "CAT_004",
	},
	{
		code: "SKILL_097",
		name: "MQTT",
		description:
			"軽量なM2M/IoT通信プロトコル。リソースが制限された環境に適しています。",
		level: 3,
		requirements:
			"パブリッシュ/サブスクライブモデルを理解し、QoSレベルや保持メッセージの設定ができること。",
		category: "ツール",
		categoryId: "CAT_005",
	},
	{
		code: "SKILL_098",
		name: "F#",
		description:
			".NET向けの関数型プログラミング言語。強力な型システムと簡潔な構文が特徴です。",
		level: 4,
		requirements:
			"パターンマッチングや非同期プログラミング、型プロバイダの概念を理解していること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
	{
		code: "SKILL_099",
		name: "Electron",
		description:
			"Web技術を使用したクロスプラットフォームデスクトップアプリケーション開発フレームワーク。",
		level: 3,
		requirements:
			"メインプロセスとレンダラープロセスの違いを理解し、IPC通信やネイティブ機能との連携ができること。",
		category: "フレームワーク",
		categoryId: "CAT_002",
	},
	{
		code: "SKILL_100",
		name: "Deno",
		description:
			"安全なJavaScript/TypeScriptランタイム。セキュリティが強化された設計が特徴です。",
		level: 3,
		requirements:
			"パーミッションシステムを理解し、標準ライブラリを活用したアプリケーション開発ができること。",
		category: "プログラミング言語",
		categoryId: "CAT_001",
	},
];

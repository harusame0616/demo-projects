export async function GET() {
	return Response.json({
		data: [
			{
				id: 1,
				title: "Hello World",
				body: "This is a test post",
			},
			{
				id: 2,
				title: "Hello World 2",
				body: "This is a test post 2",
			},
			{
				id: 3,
				title: "Hello World 3",
				body: "This is a test post 3",
			},
		],
	});
}

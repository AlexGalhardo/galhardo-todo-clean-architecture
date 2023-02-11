import app from "./app";

app.listen(process.env.PORT || 3333, () =>
	console.log(
		`🚀 GALHARDO FINANCES HTTP REST API server is running at http://localhost:${process.env.PORT ?? 3333}`,
	),
);

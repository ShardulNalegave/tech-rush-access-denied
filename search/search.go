package search

import (
	"os"

	"github.com/meilisearch/meilisearch-go"
	"github.com/rs/zerolog/log"
)

type Search struct {
	client      *meilisearch.Client
	ImagesIndex *meilisearch.Index
}

func ConnectToSearch() *Search {
	addr := os.Getenv("MOSAICIFY_MEILISEARCH_ADDR")
	if addr == "" {
		log.Fatal().Msg("MOSAICIFY_MEILISEARCH_ADDR environment variable wasn't provided")
	}

	masterKey := os.Getenv("MOSAICIFY_MEILISEARCH_MASTER_KEY")

	client := meilisearch.NewClient(meilisearch.ClientConfig{
		Host:   addr,
		APIKey: masterKey,
	})

	_, err := client.CreateIndex(&meilisearch.IndexConfig{
		Uid:        "images",
		PrimaryKey: "id",
	})
	if err != nil {
		log.Fatal().Msg("Couldn't initialize images index in Meilisearch")
	}

	imagesIndex := client.Index("images")

	log.Info().Msg("Connected to Meilisearch")
	return &Search{
		client:      client,
		ImagesIndex: imagesIndex,
	}
}

import type {StructureResolver} from 'sanity/structure'
import { ViewArticleOnSite, ViewExperienceOnSite, ViewDestinationOnSite, ViewLodgeOnSite, ViewResortOnSite, ViewCruiseLineOnSite, ViewBeachcomberSpecialOnSite } from './components/ViewOnSite'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Articles')
        .schemaType('article')
        .child(
          S.documentTypeList('article')
            .title('Articles')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('article')
                .views([
                  S.view.form().title('Edit'),
                  S.view
                    .component(ViewArticleOnSite)
                    .title('View on Site'),
                ])
            )
        ),

      S.listItem()
        .title('Experiences')
        .schemaType('experience')
        .child(
          S.documentTypeList('experience')
            .title('Experiences')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('experience')
                .views([
                  S.view.form().title('Edit'),
                  S.view
                    .component(ViewExperienceOnSite)
                    .title('View on Site'),
                ])
            )
        ),
S.listItem()
        .title('Destinations')
        .schemaType('destination')
        .child(
          S.documentTypeList('destination')
            .title('Destinations')
            .filter('_type == "destination"')
            .defaultOrdering([
              { field: 'region', direction: 'asc' },
              { field: 'name', direction: 'asc' },
            ])
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('destination')
                .views([
                  S.view.form().title('Edit'),
                  S.view
                    .component(ViewDestinationOnSite)
                    .title('View on Site'),
                ])
            )
        ),
      S.listItem()
        .title('Consultants')
        .schemaType('consultant')
        .child(S.documentTypeList('consultant').title('Consultants')),

      S.listItem()
        .title('Exclusive Escapes')
        .schemaType('exclusiveEscape')
        .child(S.documentTypeList('exclusiveEscape').title('Exclusive Escapes')),

      S.listItem()
        .title('Cruise Lines')
        .schemaType('cruiseLine')
        .child(
          S.documentTypeList('cruiseLine')
            .title('Cruise Lines')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('cruiseLine')
                .views([
                  S.view.form().title('Edit'),
                  S.view
                    .component(ViewCruiseLineOnSite)
                    .title('View on Site'),
                ])
            )
        ),

      S.listItem()
        .title('Resorts & Hotels')
        .schemaType('resort')
        .child(
          S.documentTypeList('resort')
            .title('Resorts & Hotels')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('resort')
                .views([
                  S.view.form().title('Edit'),
                  S.view
                    .component(ViewResortOnSite)
                    .title('View on Site'),
                ])
            )
        ),

      S.listItem()
        .title('Safari Lodges & Reserves')
        .schemaType('lodge')
        .child(
          S.documentTypeList('lodge')
            .title('Safari Lodges & Reserves')
            .defaultOrdering([
              { field: 'region', direction: 'asc' },
              { field: 'name', direction: 'asc' },
            ])
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('lodge')
                .views([
                  S.view.form().title('Edit'),
                  S.view
                    .component(ViewLodgeOnSite)
                    .title('View on Site'),
                ])
            )
        ),

      S.listItem()
        .title('Beachcomber Specials')
        .schemaType('beachcomberSpecial')
        .child(
          S.documentTypeList('beachcomberSpecial')
            .title('Beachcomber Specials')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('beachcomberSpecial')
                .views([
                  S.view.form().title('Edit'),
                  S.view
                    .component(ViewBeachcomberSpecialOnSite)
                    .title('View on Site'),
                ])
            )
        ),
    ])
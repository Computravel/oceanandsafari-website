import type {StructureResolver} from 'sanity/structure'
import { ViewArticleOnSite, ViewExperienceOnSite } from './components/ViewOnSite'

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
        .title('Exclusive Escapes')
        .schemaType('exclusiveEscape')
        .child(S.documentTypeList('exclusiveEscape').title('Exclusive Escapes')),

      S.listItem()
        .title('Cruise Lines')
        .schemaType('cruiseLine')
        .child(S.documentTypeList('cruiseLine').title('Cruise Lines')),

      S.listItem()
        .title('Resorts & Hotels')
        .schemaType('resort')
        .child(S.documentTypeList('resort').title('Resorts & Hotels')),

      S.listItem()
        .title('Safaris')
        .schemaType('safari')
        .child(S.documentTypeList('safari').title('Safaris')),
    ])
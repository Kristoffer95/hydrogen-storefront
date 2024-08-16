import {EditIcon} from '@sanity/icons'
import {ListItemBuilder} from 'sanity/structure';
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Navigations')
    .icon(EditIcon)
    .schemaType('navigation')
    .child(S.editor().title('Navigations').schemaType('navigation').documentId('navigation'))
)

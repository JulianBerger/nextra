import { createCatchAllMeta } from '@julianberger/nextra/catch-all'
import json from '../../../../nextra-remote-filepaths/graphql-eslint.json' assert { type: 'json' }

export default () => createCatchAllMeta(json.filePaths, json.nestedMeta)

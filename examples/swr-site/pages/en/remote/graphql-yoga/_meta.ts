import { createCatchAllMeta } from '@julianbgr/nextra/catch-all'
import json from '../../../../nextra-remote-filepaths/graphql-yoga.json' assert { type: 'json' }

export default () => {
  return createCatchAllMeta(json.filePaths, json.nestedMeta)
}

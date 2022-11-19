import { Context } from './context';
import { FormattedString } from './formattedString';
import { ThemeColor } from './themes';
import { wrapSpannedStringByWord } from './wrapSpannedStringByWord';

/**
 * Wraps or truncates the given line to into the allowed width, depending on
 * the con
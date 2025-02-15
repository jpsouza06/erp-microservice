import { UseCaseError } from '@/core/erros/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
	constructor(identifier = 'Resource') {
		super(`${identifier} not found.`)
	}
}
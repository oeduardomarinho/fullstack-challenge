/* eslint-disable max-len */
import { expect } from 'chai';
import { cleanUp, migrate } from '../../src/config/database';

// eslint-disable-next-line max-len
import * as ProfessionalTypeService from '../../src/services/professional-type.service';

describe('Professional Type', () => {
  describe('Get all professional types', () => {
    beforeEach(() => cleanUp());

    it('should return an empty array', () =>
      ProfessionalTypeService.getAllProfessionalTypes().then(
        (result) => expect(result).to.be.an('array').that.is.empty
      ));

    it('should not change a invalid professional that not exists', () =>
      ProfessionalTypeService.updateProfessionalType(1, {
        description: 'Padeiro'
      }).catch((error) =>
        expect(error.message).to.match(
          /^(?=.*\bprofessionalType\b)(?=.*\bnot found\b).*$/
        )
      ));

    it('should not erase a invalid professional type that not exists', () =>
      ProfessionalTypeService.deleteProfessionalType(1).catch((error) =>
        expect(error.message).to.match(
          /^(?=.*\bprofessionalType\b)(?=.*\bnot found\b).*$/
        )
      ));

    it('should not retrieve a invalid professional that not exists', () =>
      ProfessionalTypeService.getProfessionalType(1).catch((error) =>
        expect(error.message).to.match(
          /^(?=.*\bprofessionalType\b)(?=.*\bnot found\b).*$/
        )
      ));

    describe('should return an fullied array', () => {
      beforeEach(() => migrate());

      it('', () =>
        ProfessionalTypeService.getAllProfessionalTypes().then(
          (result) => expect(result).to.be.an('array').that.is.not.empty
        ));
    });
  });

  describe('get one professional type', () => {
    before(() => migrate());

    it('should retrieve a valid professional type', () =>
      ProfessionalTypeService.getProfessionalType(1).then((result) => {
        expect(result).to.be.an('object');
        expect(result).to.have.keys([
          'id',
          'description',
          'situation',
          'createdAt',
          'updatedAt'
        ]);
        expect(result.id).to.be.a('number').that.is.equal(1);
        expect(result.description).to.be.a('string');
        expect(result.situation).to.be.a('boolean').that.is.equal(true);
        expect(result.createdAt).to.be.a('date').that.is.lessThan(new Date());
        expect(result.updatedAt).to.be.a('date').that.is.lessThan(new Date());
      }));

    it('should not retrieve a invalid professional with invalid type', () =>
      ProfessionalTypeService.getProfessionalType('0').catch((error) =>
        expect(error.message).to.match(/^(?=.*\id\b)(?=.*\bnumber\b).*$/)
      ));
  });

  describe('create one professional type', () => {
    it('should return a valid professional type', () =>
      ProfessionalTypeService.newProfessionalType({
        description: 'Padeiro'
      }).then((result) => {
        expect(result).to.be.an('object');
        expect(result).to.have.keys([
          'id',
          'description',
          'situation',
          'createdAt',
          'updatedAt'
        ]);
        expect(result.id).to.be.a('number');
        expect(result.createdAt).to.be.a('date').that.is.lessThan(new Date());
        expect(result.updatedAt).to.be.a('date').that.is.lessThan(new Date());
        expect(result).to.include({
          description: 'Padeiro',
          situation: true
        });
      }));

    it('should not return a invalid professional type without data', () =>
      ProfessionalTypeService.newProfessionalType().catch((error) =>
        expect(error.message).to.match(
          /^(?=.*\bdescription\b)(?=.*\brequired\b).*$/
        )
      ));

    it('should not return a invalid professional type with invalid type', () =>
      ProfessionalTypeService.newProfessionalType({
        description: 1
      }).catch((error) =>
        expect(error.message).to.match(
          /^(?=.*\bdescription\b)(?=.*\bstring\b).*$/
        )
      ));

    it('should not return a invalid professional type with extra properties', () =>
      ProfessionalTypeService.newProfessionalType({
        id: 1,
        description: 'Padeiro'
      }).catch((error) =>
        expect(error.message).to.match(/^(?=.*\bid\b)(?=.*\bnot allow).*$/)
      ));
  });

  describe('update one professional type', () => {
    beforeEach(() => migrate());

    it('should change a valid professional type', () =>
      ProfessionalTypeService.getAllProfessionalTypes().then(
        // eslint-disable-next-line no-unused-vars
        ([{ id }, ..._]) =>
          ProfessionalTypeService.updateProfessionalType(id, {
            description: 'Padeiro'
          }).then((result) => {
            expect(result).to.be.an('object');
            expect(result).to.have.keys([
              'id',
              'description',
              'situation',
              'createdAt',
              'updatedAt'
            ]);
            expect(result.id).to.be.a('number').that.is.equal(id);
            expect(result.createdAt)
              .to.be.a('date')
              .that.is.lessThan(new Date());
            expect(result.updatedAt)
              .to.be.a('date')
              .that.is.lessThan(new Date());
            expect(result).to.include({
              description: 'Padeiro',
              situation: true
            });
            return;
          })
      ));

    it('should not change professional type id', () =>
      ProfessionalTypeService.getAllProfessionalTypes().then(
        // eslint-disable-next-line no-unused-vars
        ([{ id }, ..._]) =>
          ProfessionalTypeService.updateProfessionalType(id, {
            id: 0,
            description: 'Padeiro'
          }).catch((error) =>
            expect(error.message).to.match(/^(?=.*\bid\b)(?=.*\bnot allow).*$/)
          )
      ));

    it('should not change a invalid professional type with extra properties', () =>
      ProfessionalTypeService.getAllProfessionalTypes().then(
        // eslint-disable-next-line no-unused-vars
        ([{ id }, ..._]) =>
          ProfessionalTypeService.updateProfessionalType(id, {
            id,
            description: 'Padeiro'
          }).catch((error) => {
            expect(error.message).to.match(/^(?=.*\bid\b)(?=.*\bnot allow).*$/);
          })
      ));
  });

  describe('delete one professional type', () => {
    before(() => migrate());

    it('should erase a valid professional type', () =>
      ProfessionalTypeService.deleteProfessionalType(1).then((result) =>
        expect(result).to.be.an('string').to.equal('')
      ));
  });
});
